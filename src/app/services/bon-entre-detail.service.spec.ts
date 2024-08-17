import { TestBed } from '@angular/core/testing';

import { DetailEntreeService } from './bon-entre-detail.service';

describe('BonEntreDetailService', () => {
  let service:DetailEntreeService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailEntreeService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
