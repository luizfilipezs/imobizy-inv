import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsCenterComponent } from './models-center.component';

describe('ModelsCenterComponent', () => {
  let component: ModelsCenterComponent;
  let fixture: ComponentFixture<ModelsCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
