import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DetailsComponent } from './details/details.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: "", component: LandingComponent, title: "Landing" },
    { path: "catalogue", component: CatalogueComponent, title: "Catalogue" },
    { path: "catalogue/:id", component: DetailsComponent, title: "Details"},
    { path: "about", component: AboutComponent, title: "About"}
];
