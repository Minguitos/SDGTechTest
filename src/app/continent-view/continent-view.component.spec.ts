import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinentViewComponent } from './continent-view.component';

describe('ContinentViewComponent', () => {
  let component: ContinentViewComponent;
  let fixture: ComponentFixture<ContinentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
