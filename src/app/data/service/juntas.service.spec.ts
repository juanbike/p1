import { TestBed } from '@angular/core/testing';

import { JuntasService } from './juntas.service';

describe('JuntasService', () => {
  let service: JuntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuntasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
