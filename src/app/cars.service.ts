import { Injectable } from '@angular/core';
import { CarInterface } from './carInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  url = 'http://localhost:3000/cars';

  constructor() { }
  async getAllCars(): Promise<CarInterface[]> {
    const responce = await fetch(this.url);
    return responce.json() ?? [];
  };
  async getCarById(id: number): Promise<CarInterface | undefined> {
    const responce = await fetch(`${this.url}/${id}`);
    return responce.json();
  }
  submitForm(name: string, surname: string, phone: string) {
    console.log(name, surname, phone);
  }
};
