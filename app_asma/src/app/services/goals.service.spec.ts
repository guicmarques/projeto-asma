import { TestBed } from '@angular/core/testing';

import { GoalsService } from './goals.service';

describe('GoalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoalsService = TestBed.get(GoalsService);
    expect(service).toBeTruthy();
  });
});
