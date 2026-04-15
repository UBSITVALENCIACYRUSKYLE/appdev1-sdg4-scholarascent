import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankBadge } from './rank-badge';

describe('RankBadge', () => {
  let component: RankBadge;
  let fixture: ComponentFixture<RankBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
