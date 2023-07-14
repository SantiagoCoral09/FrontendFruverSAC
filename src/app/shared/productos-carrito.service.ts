import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from './producto.model';
import { ProductosCarritoModel } from './productos_carrito.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosCarritoService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {

  }

  obtenerTodosProductosTodosCarritos() {
    //Para listar todos los productos que esten agregados a carritos. ADMIN
    return this.http.get<ProductosCarritoModel[]>(`${this.BASE_URL}/all_productos_carritos`);
  }

  obtenerProductosByIDCarrito(idCarrito: string) {
    //Obtiene solo los productos de un determinado CARRITO
    return this.http.get<ProductosCarritoModel[]>(`${this.BASE_URL}/all_productos_carrito/${idCarrito}`);
  }

  obtenerProductoCarrito(idProductoCarrito: string) {
    //Obtener producto por ID del PRODUCTO EN EL CARRO DE COMPRAS
    return this.http.get<ProductosCarritoModel>(`${this.BASE_URL}/producto_carrito/${idProductoCarrito}`);
  }

  agregarProductoACarrito(productoCarrito:ProductosCarritoModel,idCarrito:string){
    return this.http.post<ProductosCarritoModel>(`${this.BASE_URL}/productos_carrito/${idCarrito}`,productoCarrito);
  }
  
  actualizarProductoACarrito(productoCarrito:ProductosCarritoModel,idCarrito:string){
    return this.http.post<ProductosCarritoModel>(`${this.BASE_URL}/producto_carrito/${idCarrito}`,productoCarrito);
  }

  eliminarTodosProductosCarrito(idCarrito: string) {
    //Obtiene solo los productos de un determinado CARRITO
    return this.http.delete<string>(`${this.BASE_URL}/all_productos_carrito/${idCarrito}`);
  }

  eliminarProductoDeCarrito(idProductoCarrito: string) {
    
    return this.http.delete<string>(`${this.BASE_URL}/producto_carrito/${idProductoCarrito}`);
  }

}