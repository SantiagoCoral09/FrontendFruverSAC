import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { ListarProductosComponent } from './listar-productos/listar-productos.component';
import { MostrarProductosComponent } from './mostrar-productos/mostrar-productos.component';

const routes: Routes = [
  {path:'mostrar_productos',component: MostrarProductosComponent},
  {path:'productos',component: ListarProductosComponent},
  {path:'productos/editar/:idProducto',component: EditarProductosComponent},
  {path:'productos/agregar',component: EditarProductosComponent},
  {path:'**',redirectTo:'/productos',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
