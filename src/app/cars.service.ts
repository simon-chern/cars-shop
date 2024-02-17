import { Injectable } from '@angular/core';
import { CarInterface } from './carInterface';

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
};
