import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarInterface } from '../carInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  @Input() car!: CarInterface;
}
