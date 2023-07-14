import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarritoModel } from '../shared/carrito.model';
import { CarritoService } from '../shared/carrito.service';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';
import { ProductosCarritoService } from '../shared/productos-carrito.service';
import { ProductosCarritoModel } from '../shared/productos_carrito.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  carrito: Observable<CarritoModel[]> | undefined;
  prodInCart = new ProductoModel("", "", 0, 0, "", "", "");
  productoCarritoActualizar = new ProductosCarritoModel("", "","", 0, 0);
  // prodInCart: Observable<ProductoModel[]> | undefined;
  carritoInfo = new CarritoModel("", "", 0, "");
  carritoActualizar = new CarritoModel("", "", 0, "");
  productosEnCarrito: Observable<ProductosCarritoModel[]> | undefined;

  total_en_carrito: number = 0;
  categorias = ["Frutas frescas", "Verduras frescas", "Hierbas y especias", "Frutos secos y semillas", "Exoticos y tropicales"];

  constructor(private carritoService: CarritoService, private productosCarritoService: ProductosCarritoService, private productoService: ProductoService) { }

  ngOnInit() {
    const idCarritoSesion = sessionStorage.getItem("idCarritoS");
    console.log(idCarritoSesion);
    if (idCarritoSesion) {
      this.carrito = this.carritoService.obtenerCarritoByID(idCarritoSesion);
      this.carrito.subscribe(data => {
        this.carritoInfo = data[0];
      });



      this.productosEnCarrito = this.productosCarritoService.obtenerProductosByIDCarrito(idCarritoSesion);
      this.productosCarritoService.obtenerProductosByIDCarrito(idCarritoSesion).subscribe((productos) => {
        this.total_en_carrito = productos.length;
      });;

      // console.log("Productos en carrito:");
      // console.log(this.productosInfo);
      console.log("Total en carrito");
      console.log(this.total_en_carrito);
      console.log(this.buscarProductoPorId('3'));
    }
  }


  buscarProductoPorId(idProducto: string) {
    this.productoService.obtenerProducto(idProducto).subscribe(data => {
      this.prodInCart = data[0];
    });
    return this.prodInCart;
  }

  actualizar_cantidad(producto: ProductoModel, cantidad: number) {
    const idCarritoS = sessionStorage.getItem('idCarritoS');
    const idCarritoL = localStorage.getItem('idCarritoL');

    if (idCarritoS && idCarritoL) {
      console.log(idCarritoS, idCarritoL, "producto agregado:");
      console.log(producto);
      console.log(`Cantidad a elegir: ${cantidad} - ${typeof (cantidad)}`);
      this.carritoService.obtenerCarritoByID(idCarritoS).subscribe(data => {
        this.carritoActualizar = data[0];
        console.log("Dats del  carrito:");
        console.log(this.carrito);
      }, error => {
        console.log(error);
      });
      let valorTotal = +this.carritoActualizar.valor_total;
      // valorTotal=+valorTotal;
      console.log("Carrito actual:", this.carrito);
      valorTotal += cantidad * producto.precio;
      console.log(valorTotal, typeof (valorTotal));
      this.carritoActualizar.valor_total = valorTotal;
      console.log(producto.precio, typeof (producto.precio));

      console.log("Carrito editar:", this.carrito);


      this.productoCarritoActualizar.CarritoId = idCarritoS;
      this.productoCarritoActualizar.ProductoId = producto.idProducto;
      this.productoCarritoActualizar.cantidad = cantidad;
      this.productoCarritoActualizar.valor_parcial = cantidad * producto.precio;
      // this.productoCarritoActualizar.nombre=producto.nombre;
      // this.productoCarritoActualizar.precio=producto.precio;
      // this.productoCarritoActualizar.cantidad_producto=producto.cantidad_producto;
      // this.productoCarritoActualizar.descripcion=producto.descripcion;
      // this.productoCarritoActualizar.categoria=producto.categoria;
      // this.productoCarritoActualizar.imagen=producto.imagen;
      console.log("Datos a llenar", this.productoCarritoActualizar);
      console.log(this.productoCarritoActualizar);
      console.log(this.carrito);

      this.carritoService.actualizarCarrito(this.carritoActualizar).subscribe(data => {
        console.log(data);
      });

      this.productosCarritoService.agregarProductoACarrito(this.productoCarritoActualizar, idCarritoS).subscribe(data => {
        console.log(data);
        alert("Se ha añadido correctamente el producto al carrito.");
        window.location.reload(); // Recargar la página
      });
    }
  }

}
