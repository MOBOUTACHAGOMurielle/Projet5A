import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarioComponent } from './dario.component';

describe('DarioComponent', () => {
  let component: DarioComponent;
  let fixture: ComponentFixture<DarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
