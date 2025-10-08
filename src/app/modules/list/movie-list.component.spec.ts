import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../service/movie.service';
import { of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [
        MovieListComponent,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatCardModule
      ],
      providers: [
        { provide: MovieService, useValue: spy }
      ]
    }).compileComponents();

    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;

    movieServiceSpy.getMovies.and.returnValue(of({
      content: [
        {
          id: 1,
          year: 2020,
          title: 'Movie A',
          studios: ['Studio 1'],
          producers: ['Producer 1'],
          winner: true
        },
        {
          id: 2,
          year: 2021,
          title: 'Movie B',
          studios: ['Studio 2'],
          producers: ['Producer 2'],
          winner: false
        }
      ],
      totalElements: 2,
      totalPages: 1,
      pageNumber: 0,
      pageSize: 10
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 10, undefined, undefined);
    expect(component.movies.length).toBe(2);
    expect(component.totalElements).toBe(2);
  });

  it('should reload movies on page change', () => {
    component.onPageChange({ pageIndex: 1, pageSize: 5, length: 2 });
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(1, 5, undefined, undefined);
  });

  it('should reload movies on filter change and reset pageIndex', () => {
    component.filterYear = 2020;
    component.filterWinner = 'true';

    component.onFilterChange();

    expect(component.pageIndex).toBe(0);
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 10, true, 2020);
  });

  it('should pass undefined winner filter when empty string', () => {
    component.filterWinner = '';
    component.filterYear = null;

    component.loadMovies();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith(0, 10, undefined, undefined);
  });
});
