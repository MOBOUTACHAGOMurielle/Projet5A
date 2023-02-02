import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideDesTaillesComponent } from './guide-des-tailles.component';

describe('GuideDesTaillesComponent', () => {
  let component: GuideDesTaillesComponent;
  let fixture: ComponentFixture<GuideDesTaillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideDesTaillesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideDesTaillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
