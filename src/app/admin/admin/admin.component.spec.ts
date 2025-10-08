import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../../modules/material.module';
import { RouterModule, Routes } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;


  @Component({ template: '' })
  class DummyComponent {}

  const routes: Routes = [
    { path: 'admin/dashboard', component: DummyComponent },
    { path: 'admin/movies', component: DummyComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent, DummyComponent],
      imports: [
        MaterialModule,
        RouterModule.forRoot(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the admin component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to /admin/dashboard', () => {
    const debugElement = fixture.debugElement.queryAll(By.css('a.link'))
      .find(de => de.attributes['ng-reflect-router-link'] === '/admin/dashboard');

    expect(debugElement).toBeTruthy();
  });

  it('should have a link to /admin/movies', () => {
    const debugElement = fixture.debugElement.queryAll(By.css('a.link'))
      .find(de => de.attributes['ng-reflect-router-link'] === '/admin/movies');

    expect(debugElement).toBeTruthy();
  });
});
