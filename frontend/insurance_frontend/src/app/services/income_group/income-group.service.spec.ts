import { TestBed } from '@angular/core/testing';

import { IncomeGroupService } from './income-group.service';

describe('IncomeGroupService', () => {
  let service: IncomeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
