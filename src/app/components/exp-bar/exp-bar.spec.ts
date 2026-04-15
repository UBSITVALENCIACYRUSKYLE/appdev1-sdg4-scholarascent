import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpBar } from './exp-bar';

describe('ExpBar', () => {
  let component: ExpBar;
  let fixture: ComponentFixture<ExpBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
