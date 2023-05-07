import { TestBed } from '@angular/core/testing';

import { SignUpSignInForgotPasswordService } from './sign-up-sign-in-forgot-password.service';

describe('SignUpSignInForgotPasswordService', () => {
  let service: SignUpSignInForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpSignInForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
