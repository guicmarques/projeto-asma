import { TestBed } from '@angular/core/testing';

import { UserValidationService } from './user-validation.service';

describe('UserValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserValidationService = TestBed.get(UserValidationService);
    expect(service).toBeTruthy();
  });
});
