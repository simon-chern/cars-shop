import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CarInterface } from '../carInterface';
import { CarsService } from '../cars.service';
import { CarComponent } from '../car/car.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CarComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  cars: CarInterface[] = [];
  carsService: CarsService = inject(CarsService);
  filteredCars: CarInterface[] = [];

  constructor(public destroyRef: DestroyRef) {
    this.carsService.getAllCars().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((cars: CarInterface[]) => {
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
  public getAllCarsButton() {
    this.carsService.getAllCars().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((cars: CarInterface[]) => {
      this.cars = cars;
      this.filteredCars = cars;
      this.isToggled = false;
    });
  }
  public toggleButton() {
    this.isToggled = !this.isToggled;
  }
  uniqueBrands: string[] = ["BMW", "Audi"];
  //uniqueBrands = new BehaviorSubject<string[]>([]);
  //it doesn't make sence to use this construction here 'cause it won't be changed over time just for the purpose of training RxJs.
  ngOnInit(): void {
    // this.carsService.getUniqueBrands().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(brands => {
    //   this.uniqueBrands.next(brands);
    //   //this.uniqueBrands = brands;
    // });
    this.carsService.getAllCars().pipe(takeUntilDestroyed(this.destroyRef))
    .pipe(map(data => this.carsService.extractUniqueBrands(data)))
    .subscribe(brands => this.uniqueBrands = brands);
  };
}
