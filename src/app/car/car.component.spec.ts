import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarComponent } from './car.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the car property when the input is set', () => {
    const car = {
      id: "1",
      brand: 'BMW',
      model: 'i3',
      price: "30000",
      photo: 'photo.png',
      horsepowers: "32",
      year: "2020"
    };
    component.car = car;
    fixture.detectChanges();
    expect(component.car).toEqual(car);
  });
});
