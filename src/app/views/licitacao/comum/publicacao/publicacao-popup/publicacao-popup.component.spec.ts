import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacaoPopupComponent } from './publicacao-popup.component';

describe('PublicacaoPopupComponent', () => {
  let component: PublicacaoPopupComponent;
  let fixture: ComponentFixture<PublicacaoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacaoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacaoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
