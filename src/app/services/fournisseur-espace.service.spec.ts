import { TestBed } from '@angular/core/testing';

import { FournisseurEspaceService } from './fournisseur-espace.service';

describe('FournisseurEspaceService', () => {
  let service: FournisseurEspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FournisseurEspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
