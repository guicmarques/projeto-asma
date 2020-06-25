import { TestBed } from '@angular/core/testing';

import { BarrierService } from './barrier.service';

describe('BarrierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarrierService = TestBed.get(BarrierService);
    expect(service).toBeTruthy();
  });
});
