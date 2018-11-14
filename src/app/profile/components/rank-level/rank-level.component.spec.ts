import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankLevelComponent } from './rank-level.component';

describe('RankLevelComponent', () => {
  let component: RankLevelComponent;
  let fixture: ComponentFixture<RankLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
