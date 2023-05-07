import { TestBed } from '@angular/core/testing';

import { SignUpLoginFOrgotPasswordService } from './sign-up-login-forgot-password.service';

describe('SignUpLoginFOrgotPasswordService', () => {
  let service: SignUpLoginFOrgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpLoginFOrgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
