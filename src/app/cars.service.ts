import { Injectable } from '@angular/core';
import { CarInterface } from './carInterface';
import { Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CarsService {
  private readonly leadsCollection = collection(this.firestore, 'leads');
  private readonly carsCollection = collection(this.firestore, 'cars');

  constructor(private readonly firestore: Firestore) {}

  public getAllCars(): Observable<CarInterface[]> {
    return collectionData(this.carsCollection, {
      idField: 'id'
    }) as Observable<CarInterface[]>;
  }

  public async getCarById(id: number) {
    const docRef = doc(this.firestore, "cars", id.toString());
    const docSnap = await getDoc(docRef);
    return docSnap;
  }

  public submitForm(name: string, phone: string): Observable<string> {
    const createLead = { name, phone };
    const promise = addDoc(this.leadsCollection, createLead).then((responce) => responce.id);
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
