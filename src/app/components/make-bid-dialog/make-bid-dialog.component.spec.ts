import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeBidDialogComponent } from './make-bid-dialog.component';

describe('MakeBidDialogComponent', () => {
  let component: MakeBidDialogComponent;
  let fixture: ComponentFixture<MakeBidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeBidDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeBidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
