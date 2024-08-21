import { TestBed } from '@angular/core/testing';

import { BonEntreeService } from './bon-entre.service';

describe('BonEntreService', () => {
  let service: BonEntreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonEntreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
