import { Component, inject, OnInit} from '@angular/core';
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
export class CatalogueComponent implements OnInit {
  cars: CarInterface[] = [];
  carsService: CarsService = inject(CarsService);
  filteredCars: CarInterface[] = [];

  constructor() {
    this.carsService.getAllCars().then((cars: CarInterface[]) => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  };
  filterCars(brand: string) {
    this.filteredCars = this.cars.filter(
      car => car?.brand.includes(brand)
    )
    this.isToggled = false;
  }
  isToggled: boolean = false;
  getAllCarsButton() {
    this.carsService.getAllCars().then((cars: CarInterface[]) => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  }
  toggleButton() {
    this.isToggled = !this.isToggled;
  }
  uniqueBrands: string[] = [];

  ngOnInit(): void {
    this.carsService.getUniqueBrands().subscribe(brands => {
      this.uniqueBrands = brands;
    });
  }
}
