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
  constructor(private http: HttpClient) { }

  getAllCars(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(this.url);
  }

  getCarById(id: number): Observable<CarInterface | undefined> {
    return this.http.get<CarInterface>(`${this.url}/${id}`)
  }
  submitForm(name: string, surname: string, phone: string) {
    console.log(name, surname, phone);
  }


  getUniqueBrands(): Observable<string[]> {
    return this.http.get<CarInterface[]>(this.url).pipe(
      map(data => this.extractUniqueBrands(data))
    );
  }

  extractUniqueBrands(data: CarInterface[]): string[] {
    const uniqueBrands = new Set<string>();
    data.forEach(item => {
      if (item && item.brand) {
        uniqueBrands.add(item.brand);
      }
    });
    return Array.from(uniqueBrands);
  }
};
