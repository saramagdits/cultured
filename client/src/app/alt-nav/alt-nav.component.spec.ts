import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltNavComponent } from './alt-nav.component';

describe('AltNavComponent', () => {
  let component: AltNavComponent;
  let fixture: ComponentFixture<AltNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
