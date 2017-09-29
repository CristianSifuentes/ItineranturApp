import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellersComponent } from './travellers.component';

describe('TravellersComponent', () => {
  let component: TravellersComponent;
  let fixture: ComponentFixture<TravellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
