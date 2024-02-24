import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //user authentication 
  isAuthenticated: boolean = true;
  //autherntication function 
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  constructor() { }
}
