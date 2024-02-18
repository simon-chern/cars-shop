import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {path: "", component: LandingComponent},
    {path: "catalogue", component: CatalogueComponent, title: "Catalogue"},
    {path: "catalogue/:id", component: DetailsComponent},
];
