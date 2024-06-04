import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';
import { OverlayManager } from '../../../../overlay';
import { products } from '../../../../products';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  standalone: true,
  imports:[
  ],
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit {
  products = products;
  txts: string[] = [];

  SCAN_DELAY = 2000; //Delay para escanear

  // Mapa para calcular ultimo scan
  lastScanned: Map<string, number> = new Map();

  isLoaded = false;
  overlay: HTMLCanvasElement | undefined;
  context: CanvasRenderingContext2D | undefined;
  scanner: BarcodeScanner | undefined;
  cameraInfo: any = {};
  videoSelect: HTMLSelectElement | undefined;
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
    this.videoSelect = document.querySelector('select#videoSource') as HTMLSelectElement;
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
      let cameras = await this.scanner.getAllCameras();
      this.listCameras(cameras);
      await this.openCamera();
      this.scanner.onFrameRead = results => {
        
        this.overlayManager.clearOverlay();
        let resultElement = document.getElementById('result');
        
        // try {
          let localization;
          if (results.length > 0) {

            for (var i = 0; i < results.length; ++i) {

              let barcodeText = results[i].barcodeText;
              let now = Date.now();

              if (!this.lastScanned.has(barcodeText) || (now - this.lastScanned.get(barcodeText)!) > this.SCAN_DELAY) {
                this.txts.push(results[i].barcodeText);
                this.lastScanned.set(barcodeText, now);
                this.scannedProduct.emit(barcodeText);
                // localization = results[i].localizationResult;
                // this.overlayManager.drawOverlay(localization, results[i].barcodeText);
              }
            }
            // if (resultElement) {
            //   resultElement.innerHTML += this.txts.join(', ');
            // }
          }
          // else {
          //   if (resultElement) {
          //     resultElement.innerHTML = "No barcode found";
          //   }
          // }

        // } catch (e) {
        //   alert(e);
        // };
      };
      this.scanner.onPlayed = () => {
        this.updateResolution();
      }
      await this.scanner.show();
    }
  }

  async openCamera(): Promise<void> {
    this.overlayManager.clearOverlay();
    if (this.videoSelect) {
      let deviceId = this.videoSelect.value;
      if (this.scanner) {
        await this.scanner.setCurrentCamera(this.cameraInfo[deviceId]);
      }
    }

  }

  listCameras(deviceInfos: any): void {
    for (var i = 0; i < deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      option.text = deviceInfo.label;
      this.cameraInfo[deviceInfo.deviceId] = deviceInfo;
      if (this.videoSelect) this.videoSelect.appendChild(option);
    }
  }
}