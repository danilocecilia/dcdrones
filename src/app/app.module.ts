import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent }     from './components/main/main';
import { MenuComponent }    from './components/menu/menu';
import { BannerComponent }  from './components/banner/banner';
import { GalleryComponent } from './components/gallery/gallery';
import { AboutComponent }   from './components/about/about';
import { ContactComponent }   from './components/contact/contact';
import { FooterComponent }   from './components/footer/footer';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    BannerComponent,
    GalleryComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent
  ],
  bootstrap: [ AppComponent, MenuComponent, BannerComponent, AboutComponent, ContactComponent, FooterComponent ]
})
export class AppModule { }
