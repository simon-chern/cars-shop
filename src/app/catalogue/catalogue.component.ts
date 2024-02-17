import { Component, inject } from '@angular/core';
import { CarInterface } from '../carInterface';
import { CarsService } from '../cars.service';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CarComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent {
  cars: CarInterface[] = [];
  carsService: CarsService = inject(CarsService);

  constructor() {
    this.carsService.getAllCars().then((cars: CarInterface[]) => {
      this.cars = cars;
    })
  }
}
