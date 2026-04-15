import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HunterProfile } from './hunter-profile';

describe('HunterProfile', () => {
  let component: HunterProfile;
  let fixture: ComponentFixture<HunterProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HunterProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HunterProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
