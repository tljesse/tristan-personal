import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSnippetComponent } from './blog-snippet.component';

describe('BlogSnippetComponent', () => {
  let component: BlogSnippetComponent;
  let fixture: ComponentFixture<BlogSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogSnippetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
