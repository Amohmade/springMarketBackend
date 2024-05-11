import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [RouterModule,MatButtonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}
