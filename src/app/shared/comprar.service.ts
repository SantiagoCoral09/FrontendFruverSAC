import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompraModel } from './compras.model';

@Injectable({
  providedIn: 'root'
})
export class ComprarService {

  BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

  }
agregarCompra(compra:CompraModel){
    return this.http.post<string>(`${this.BASE_URL}/compras`,compra);
  }
}
