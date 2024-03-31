import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCD3xNtgretbCL6K6zSfIJ7QlVQgSzedp8",
  authDomain: "cars-6fc32.firebaseapp.com",
  projectId: "cars-6fc32",
  storageBucket: "cars-6fc32.appspot.com",
  messagingSenderId: "8518349863",
  appId: "1:8518349863:web:d92b7ebb5177168978ca02",
  measurementId: "G-NKSZWH5R1V"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ])
  ]
};
