import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars.service';
import { CarComponent } from '../car/car.component';


describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockCarsService: Partial<CarsService>;


  beforeEach(async () => {
    mockCarsService = {
      submitForm: jasmine.createSpy('submitForm')
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [DetailsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit the form and reset it on submitForm', () => {
    // Mock form data
    component.carForm.setValue({ name: 'John', surname: 'Doe', phone: '123456789' });

    // Trigger submitForm
    component.submitForm();

    // Expect submitForm to be called with the form data
    //expect(mockCarsService.submitForm).toHaveBeenCalledWith('John', 'Doe', '123456789');

    expect(component.carForm.value).toEqual({ name: null, surname: null, phone: null });
  });
});
