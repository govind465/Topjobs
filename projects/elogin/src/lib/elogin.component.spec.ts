import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EloginComponent } from './elogin.component';

describe('EloginComponent', () => {
  let component: EloginComponent;
  let fixture: ComponentFixture<EloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
