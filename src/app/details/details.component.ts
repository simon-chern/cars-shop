import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarInterface } from '../carInterface';
import { CarsService } from '../cars.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatFormFieldModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  car: CarInterface | undefined;
  CarsService = inject(CarsService);
  text = '';
  carForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  })
  constructor() {
    const carId = this.route.snapshot.params['id'];
    this.CarsService.getCarById(carId).then(docSnap => {
      if (docSnap.exists()) {
        const carData = docSnap.data() as CarInterface; // Assuming CarInterface matches the structure of the data in Firestore
        this.car = carData;
      } else {
        console.log("u are fucked up")
      }
    }).catch(error => {
      console.error('Error getting car:', error);
    });
  }
  submited: boolean = false;
  public submitForm() {
    if(this.carForm.valid) {
      const name = this.carForm.value.name ?? '';
      const phone = this.carForm.value.phone ?? '';
      this.CarsService.submitForm(name, phone)
      this.carForm.reset();
      this.text = "The info was successfully send and our manager will call you back soon."
      setInterval(() => {
        this.text = '';
      }, 10000);
      this.submited = false;
    } else {
      this.submited = true; 
    }
  }
}
