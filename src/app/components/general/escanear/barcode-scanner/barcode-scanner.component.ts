import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner} from 'dynamsoft-javascript-barcode';
import { OverlayManager } from '../../../../overlay';
import { products } from '../../../../products';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectChange } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface VideoDeviceInfo {
  deviceId: string;
  label: string;
}

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  standalone: true,
  imports:[
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    FormsModule
  ],
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit {
  products = products;
  txts: string[] = [];
  
  cameras: MediaDeviceInfo[] = [];
  selectedCamera: string | null = null;

  SCAN_DELAY = 1500; //Delay para escanear

  // Mapa para calcular ultimo scan
  lastScanned: Map<string, number> = new Map();

  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  scanner: BarcodeScanner | undefined;
  cameraInfo: { [key: string]: MediaDeviceInfo } = {};
  overlayManager: OverlayManager;

  @Output() scannedProduct = new EventEmitter<string>();

  constructor() { 
    this.overlayManager = new OverlayManager();
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('txt');
  }

  ngOnInit(): void {
    this.overlayManager.initOverlay(document.getElementById('overlay') as HTMLCanvasElement);
    (async () => {
      await this.initBarcodeScanner();
    })();
  }

  updateResolution(): void {
    if (this.scanner) {
      let resolution = this.scanner.getResolution();
      this.overlayManager.updateOverlay(resolution[0], resolution[1]);
    }
  }

  async initBarcodeScanner(): Promise<void> {
    this.scanner = await BarcodeScanner.createInstance();
    this.isLoaded = true;
    await this.scanner.updateRuntimeSettings("single");
    let uiElement = document.getElementById('videoContainer');
    if (uiElement) {
      await this.scanner.setUIElement(uiElement);
      let cameras = await this.scanner.getAllCameras() as unknown as MediaDeviceInfo[];
      this.listCameras(cameras);
      
      if (this.cameras.length > 0) {
        this.selectedCamera = this.cameras[0].deviceId;
        await this.openCamera();
      }

      this.scanner.onFrameRead = results => {
        this.overlayManager.clearOverlay();
        let resultElement = document.getElementById('result');

        if (results.length > 0) {
          for (var i = 0; i < results.length; ++i) {
            let barcodeText = results[i].barcodeText;
            let now = Date.now();

            if (!this.lastScanned.has(barcodeText) || (now - this.lastScanned.get(barcodeText)!) > this.SCAN_DELAY) {
              this.txts.push(results[i].barcodeText);
              this.lastScanned.set(barcodeText, now);
              this.scannedProduct.emit(barcodeText);
            }
          }
        }
      };
      this.scanner.onPlayed = () => {
        this.updateResolution();
      }
      await this.scanner.show();
    }
  }

  async openCamera(event?: MatSelectChange): Promise<void>{
    this.overlayManager.clearOverlay();
    if (this.selectedCamera) {
      if (this.scanner) {
        await this.scanner.setCurrentCamera(this.cameraInfo[this.selectedCamera]);
      }
    }
  }

  listCameras(deviceInfos: VideoDeviceInfo[]): void {
    this.cameras = deviceInfos.map(deviceInfo => ({
      deviceId: deviceInfo.deviceId,
      groupId: '',
      kind: 'videoinput',
      label: deviceInfo.label,
      toJSON: () => ({})
    }));
    this.cameraInfo = this.cameras.reduce((acc, deviceInfo) => {
      acc[deviceInfo.deviceId] = deviceInfo;
      return acc;
    }, {} as { [key: string]: MediaDeviceInfo });
  }
}