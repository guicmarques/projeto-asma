import { TestBed } from '@angular/core/testing';

import { FAQService } from './FAQ.service';

describe('FAQService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FAQService = TestBed.get(FAQService);
    expect(service).toBeTruthy();
  });
});
