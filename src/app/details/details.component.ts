import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarInterface } from '../carInterface';
import { CarsService } from '../cars.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  car: CarInterface | undefined;
  CarsService = inject(CarsService);
  constructor() {
    const carId = Number(this.route.snapshot.params['id']);
    this.CarsService.getCarById(carId).then(car => {
      this.car = car;
    })
  }
  carForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl('')
  })
  submitForm(){
    this.CarsService.submitForm(
      this.carForm.value.name ?? '',
      this.carForm.value.surname ?? '',
      this.carForm.value.phone ?? ''
    )
  }
}
