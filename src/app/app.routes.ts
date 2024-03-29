import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DetailsComponent } from './details/details.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: "", component: LandingComponent },
    { path: "catalogue", component: CatalogueComponent, title: "Catalogue" },
    { path: "catalogue/:id", component: DetailsComponent, canActivate: [authGuard] },
    { path: "about", loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)}
];
