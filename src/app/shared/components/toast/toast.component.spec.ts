import {TestBed, ComponentFixture} from '@angular/core/testing';
import {ToastComponent} from './toast.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
