import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CarsService } from '../cars.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../apikey';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockCarsService: Partial<CarsService>;


  beforeEach(async () => {
    mockCarsService = {
      submitForm: jasmine.createSpy('submitForm')
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        importProvidersFrom([
          provideFirebaseApp(() => initializeApp(firebaseConfig)),
          provideFirestore(() => getFirestore()),
        ]), provideAnimationsAsync('noop'), provideAnimationsAsync()
      ]
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
    component.carForm.setValue({ name: 'John', phone: '123456789' });

    // Trigger submitForm
    component.submitForm();

    // Expect submitForm to be called with the form data
    //expect(mockCarsService.submitForm).toHaveBeenCalledWith('John', 'Doe', '123456789');

    expect(component.carForm.value).toEqual({ name: null, phone: null });
  });
});
