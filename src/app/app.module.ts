import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Llamar a los metodos post, get, put y delete del backend
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ProductoService } from './shared/producto.service';
import { MostrarProductosComponent } from './mostrar-productos/mostrar-productos.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarProductosComponent,
    EditarProductosComponent,
    MostrarProductosComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ProductoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
