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
});
