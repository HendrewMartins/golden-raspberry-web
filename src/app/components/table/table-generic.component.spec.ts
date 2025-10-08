import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableGenericComponent } from './table-generic.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

describe('TableGenericComponent', () => {
  let component: TableGenericComponent;
  let fixture: ComponentFixture<TableGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableGenericComponent,
        CommonModule,
        MatTableModule,
        MatCardModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableGenericComponent);
    component = fixture.componentInstance;

    component.title = 'Test Table';
    component.columns = [
      { def: 'name', header: 'Name' },
      { def: 'age', header: 'Age' }
    ];
    component.data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 }
    ];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(2);
  });

  it('should render the correct headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('th.mat-header-cell');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toContain('Name');
    expect(headers[1].textContent).toContain('Age');
  });

  it('should display title in h3', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent).toContain('Test Table');
  });
});
