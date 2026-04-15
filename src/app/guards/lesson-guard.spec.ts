import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { lessonGuard } from './lesson-guard';

describe('lessonGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => lessonGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
