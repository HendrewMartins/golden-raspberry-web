import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TableGenericComponent } from './table-generic.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';

describe('TableGenericComponent', () => {
  let component: TableGenericComponent;
  let fixture: ComponentFixture<TableGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableGenericComponent,
        MatTableModule,
        CdkTableModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableGenericComponent);
    component = fixture.componentInstance;

    component.title = 'Test Table';
    component.columns = [
      { def: 'name', header: 'Name' },
      { def: 'age', header: 'Age' },
    ];
    component.data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the correct number of rows', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(2);
  }));

  it('should render the correct headers', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('th.mat-header-cell');
    expect(headers.length).toBe(2);

    const headerTexts = Array.from(headers as NodeListOf<HTMLElement>)
      .map(h => h.textContent?.trim() || '');
    expect(headerTexts).toEqual(['Name', 'Age']);
  }));

  it('should display title in h3', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent).toContain('Test Table');
  }));
});
