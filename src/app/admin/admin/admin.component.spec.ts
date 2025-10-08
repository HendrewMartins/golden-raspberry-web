import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  template: ''
})
class DummyComponent {}

describe('AdminComponent', () => {
  let fixture: ComponentFixture<AdminComponent>;
  let component: AdminComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminComponent,
        RouterTestingModule.withRoutes([
          { path: 'admin/dashboard', component: DummyComponent },
          { path: 'admin/movies', component: DummyComponent },
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to /admin/dashboard', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routerLinks = links.map(de => (de.injector.get(RouterLink) as any).linkParams);
    expect(routerLinks).toContain(['/admin/dashboard']);
  });

  it('should have a link to /admin/movies', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routerLinks = links.map(de => (de.injector.get(RouterLink) as any).linkParams);
    expect(routerLinks).toContain(['/admin/movies']);
  });
});
