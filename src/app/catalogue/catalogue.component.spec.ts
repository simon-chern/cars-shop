import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueComponent } from './catalogue.component';
import { HttpClientModule } from '@angular/common/http';

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
