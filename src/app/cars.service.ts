import { Injectable, inject } from '@angular/core';
import { CarInterface } from './carInterface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CarsService {
  url = 'http://localhost:3000/cars';
  constructor(private http: HttpClient) {
  }
  getAllCars(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(this.url);
  }

  getCarById(id: number): Observable<CarInterface | undefined> {
    return this.http.get<CarInterface>(`${this.url}/${id}`)
  }
  
  public getUniqueBrands(): Observable<string[]> {
    return this.http.get<CarInterface[]>(this.url).pipe(
      map(data => this.extractUniqueBrands(data))
    );
  }
  firestore = inject(Firestore);
  carsCollection = collection(this.firestore, 'leads');

  submitForm(name: string, phone: string): Observable<string> {
    const createLead = { name, phone };
    const promise = addDoc(this.carsCollection, createLead).then((responce) => responce.id);
    return from(promise);
  }
  public extractUniqueBrands(data: CarInterface[]): string[] {
    const uniqueBrands = new Set<string>();
    data.forEach(item => {
      if (item && item.brand) {
        uniqueBrands.add(item.brand);
      }
    });
    return Array.from(uniqueBrands);
  }
};
