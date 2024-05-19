import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarInterface } from '../carInterface';
import { CarsService } from '../cars.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent {
  public car: CarInterface | undefined;
  public text = '';
  public carForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  })
  constructor(private readonly route: ActivatedRoute, private readonly CarsService: CarsService) {
    const carId = this.route.snapshot.params['id'];
    this.CarsService.getCarById(carId).then(docSnap => {
      const carData = docSnap.data() as CarInterface;
      this.car = carData;
    }).catch(error => {
      console.error('Error getting car:', error);
    });
  }

  public submitForm() {
    if (this.carForm.valid) {
      const name = this.carForm.value.name ?? '';
      const phone = this.carForm.value.phone ?? '';
      this.CarsService.submitForm(name, phone)
      this.carForm.reset();
      this.text = "Спасибо за заявку, мы свяжемся с Вами в ближайшее время."
      setInterval(() => {
        this.text = '';
      }, 10000);
    }
  }
}
