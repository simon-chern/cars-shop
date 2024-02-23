import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarInterface } from './carInterface';
import { CarsService } from './cars.service';

describe('CarsService', () => {
  let service: CarsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarsService]
});
    service = TestBed.inject(CarsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // Ensure that there are no outstanding HTTP requests after each test
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected cars', () => {
    const expectedCars: CarInterface[] = [
      {
        "id": 0,
        "photo": "./assets/photo1.jpg",
        "brand": "BMW",
        "model": "M5",
        "horsepowers": 625,
        "price": 50000,
        "year": 2020
      }
    ];

    // Make an HTTP GET request
    service.getAllCars().subscribe(cars => {
      expect(cars).toEqual(expectedCars);
    });

    // Expect one request to the specified URL with a GET request
    const req = httpTestingController.expectOne('http://localhost:3000/cars');
    expect(req.request.method).toEqual('GET');

    // Respond with the mock data
    req.flush(expectedCars);
  });
  
});
