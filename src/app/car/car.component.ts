import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarInterface } from '../carInterface';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  @Input() car!: CarInterface;
}
