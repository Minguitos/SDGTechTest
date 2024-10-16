import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualViewComponent } from './individual-view.component';

describe('IndividualViewComponent', () => {
  let component: IndividualViewComponent;
  let fixture: ComponentFixture<IndividualViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
