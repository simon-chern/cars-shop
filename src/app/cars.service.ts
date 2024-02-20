import { Injectable } from '@angular/core';
import { CarInterface } from './carInterface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  url = 'http://localhost:3000/cars';

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

  constructor(private http: HttpClient) { }

  getUniqueBrands(): Observable<string[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(data => this.extractUniqueBrands(data))
    );
  }

  private extractUniqueBrands(data: any[]): string[] {
    const uniqueBrands = new Set<string>();
    data.forEach(item => {
      if (item && item.brand) {
        uniqueBrands.add(item.brand);
      }
    });
    return Array.from(uniqueBrands);
  }
};
