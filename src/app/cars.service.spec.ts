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

  it('should return expected cars from getallcars()', () => {
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
  it('should get a car by id getCarById()', () => {
    const expectedCar: CarInterface = {
      "id": 0,
      "photo": "./assets/photo1.jpg",
      "brand": "BMW",
      "model": "M5",
      "horsepowers": 625,
      "price": 50000,
      "year": 2020
    };
    service.getCarById(0).subscribe(car => {
      expect(car).toEqual(expectedCar);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/cars/0');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedCar);
  });

  it('should console.log submit value', () => {
    const consoleSpy = spyOn(console, 'log');
    service.submitForm('name', 'surname', '1488');
    expect(consoleSpy).toHaveBeenCalledWith('name', 'surname', '1488')
  });

  it('should extract unique brands', () => {
    const data: CarInterface[] = [
      {
        "id": 0,
        "photo": "./assets/photo1.jpg",
        "brand": "BMW",
        "model": "M5",
        "horsepowers": 625,
        "price": 50000,
        "year": 2020
      },
      {
        "id": 2,
        "photo": "./assets/photo3.jpg",
        "brand": "Mersedes-benz",
        "model": "G-class",
        "horsepowers": 585,
        "price": 70000,
        "year": 2020
      }
    ];
    expect(service.extractUniqueBrands(data)).toEqual(['BMW', 'Mersedes-benz']);
  });
  it('should handle undefined data', () => {
    const data: CarInterface[] = [
      {
        "id": 0,
        "photo": "./assets/photo1.jpg",
        "brand": "BMW",
        "model": "M5",
        "horsepowers": 625,
        "price": 50000,
        "year": 2020
      },
      {
        "id": 2,
        "photo": "./assets/photo3.jpg",
        "brand": "",
        "model": "G-class",
        "horsepowers": 585,
        "price": 70000,
        "year": 2020
      },
    ];
    expect(service.extractUniqueBrands(data)).toEqual(['BMW'])
  });

  it('should return unique brands', () => {
    const data: CarInterface[] = [
      {
        "id": 0,
        "photo": "./assets/photo1.jpg",
        "brand": "BMW",
        "model": "M5",
        "horsepowers": 625,
        "price": 50000,
        "year": 2020
      },
      {
        "id": 2,
        "photo": "./assets/photo3.jpg",
        "brand": "Mersedes-benz",
        "model": "G-class",
        "horsepowers": 585,
        "price": 70000,
        "year": 2020
      }
    ];
    const uniqueBrands = ['BMW', 'Mersedes-benz'];
    service.getUniqueBrands().subscribe(brands => {
      expect(brands).toEqual(uniqueBrands);
    });
    const req = httpTestingController.expectOne('http://localhost:3000/cars');
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });
});