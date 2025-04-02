import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderBracketComponent } from './render-bracket.component';

describe('RenderBracketComponent', () => {
  let component: RenderBracketComponent;
  let fixture: ComponentFixture<RenderBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderBracketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
