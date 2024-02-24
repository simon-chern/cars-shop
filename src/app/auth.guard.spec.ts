import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: CanActivateFn;

  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let authService: AuthService;
  const mockAuthService = {
    isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true)
  }
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: authGuard, useValue: authGuard },
      ],
    });
    guard = TestBed.inject(authGuard)
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
  it('should deny navigation when user is not logged in', () => {
  });
});
