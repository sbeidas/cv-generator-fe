import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterRoutingModule } from './footer-routing.module';

import { FooterComponent } from '../../components/footer/footer.component';
import { GeolocationModule } from '../geolocation/geolocation.module';

/** Footer module. */
@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    FooterRoutingModule,
    GeolocationModule,
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
