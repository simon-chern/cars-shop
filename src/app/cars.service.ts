import { Injectable, inject } from '@angular/core';
import { CarInterface } from './carInterface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarsService {
  url = 'http://localhost:3000/cars';
  firestore = inject(Firestore);
  leadsCollection = collection(this.firestore, 'leads');
  carsCollection = collection(this.firestore, 'cars');
  constructor(private http: HttpClient) {
  }
  getAllCars(): Observable<CarInterface[]> {
    //return this.http.get<CarInterface[]>(this.url);
    return collectionData(this.carsCollection, {
      idField: 'id'
    }) as Observable<CarInterface[]>;
  }

  async getCarById(id: number) {
    const docRef = doc(this.firestore, "cars", id.toString());
    const docSnap = await getDoc(docRef);
    return docSnap;
  }

  submitForm(name: string, phone: string): Observable<string> {
    const createLead = { name, phone };
    const promise = addDoc(this.leadsCollection, createLead).then((responce) => responce.id);
    return from(promise);
  }

  public getUniqueBrands(): Observable<string[]> {
    return this.http.get<CarInterface[]>(this.url).pipe(
      map(data => this.extractUniqueBrands(data))
    );
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
