import { Component, inject } from '@angular/core';
import { CarInterface } from '../carInterface';
import { CarsService } from '../cars.service';
import { CarComponent } from '../car/car.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CarComponent, CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent {
  cars: CarInterface[] = [];
  carsService: CarsService = inject(CarsService);
  filteredCars: CarInterface[] = [];

  constructor() {
    this.carsService.getAllCars().then((cars: CarInterface[]) => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  };
  filterCars(option: string) {
    if (option === "ALL") {
      this.filteredCars = this.cars;
      this.isToggled = false;
    } else {
    this.filteredCars = this.cars.filter(
      car => car?.brand.includes(option)
    )
    this.isToggled = false;
    }
  }
    
  dropdownOptions: string[] = ["ALL", "BMW", "Audi", "Mersedes-benz", "Porshe"];
  isToggled: boolean = false;

  toggleButton() {
    this.isToggled = !this.isToggled;
  }
}
