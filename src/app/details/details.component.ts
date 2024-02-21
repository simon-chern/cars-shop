import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarInterface } from '../carInterface';
import { CarsService } from '../cars.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

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
  text = '';
  carForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl('')
  })
  constructor() {
    const carId = Number(this.route.snapshot.params['id']);
    this.CarsService.getCarById(carId).subscribe(car => {
      this.car = car;
    })
  }
  submitForm() {
    this.CarsService.submitForm(
      this.carForm.value.name ?? '',
      this.carForm.value.surname ?? '',
      this.carForm.value.phone ?? ''
    )
    this.carForm.reset()
    this.text = "The info was successfully send and our manager will call you back soon."
    setInterval(() => {
      this.text = '';
    }, 10000)
  }
}
