import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieDashboardComponent } from './movie-dashboard.component';
import { MovieService } from '../service/movie.service';
import { of } from 'rxjs';
import { TableGenericComponent } from '../../components/table/table-generic.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MovieWinner } from '../../model/movie-winner';


const mockYears = [{ year: 2000, winnerCount: 2 }];
const mockStudios = [{ name: 'Studio A', winCount: 5 }];
const mockIntervals = {
  max: [{ producer: 'Producer A', interval: 10, previousWin: 1990, followingWin: 2000 }],
  min: [{ producer: 'Producer B', interval: 1, previousWin: 2010, followingWin: 2011 }]
};
const mockWinners: MovieWinner[] = [
  {
    id: 1,
    year: 2000,
    title: 'Movie 1',
    studios: ['Studio 1'],
    producers: ['Producer 1'],
    winner: true
  }
];


class MockMovieService {
  getYearsWithMultipleWinners() {
    return of({ years: mockYears });
  }
  getTopStudiosWithWinCount() {
    return of({ studios: mockStudios });
  }
  getWinIntervals() {
    return of(mockIntervals);
  }
  getWinnersByYear(year: number) {
    if (year === 2000) {
      return of(mockWinners);
    }
    return of([]);
  }
}

describe('MovieDashboardComponent', () => {
  let component: MovieDashboardComponent;
  let fixture: ComponentFixture<MovieDashboardComponent>;
  let movieService: MovieService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MovieDashboardComponent,
        FormsModule,
        MatTableModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        TableGenericComponent
      ],
      providers: [
        { provide: MovieService, useClass: MockMovieService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDashboardComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on init', () => {
    expect(component.years).toEqual(mockYears);
    expect(component.studios).toEqual(mockStudios);
    expect(component.intervals).toEqual(mockIntervals);
  });

  it('should search winners by valid year', () => {
    component.searchYear = '2000';
    component.searchWinnersByYear();
    expect(component.winnersByYear).toEqual(mockWinners);
  });

  it('should clear winnersByYear for invalid year', () => {
    component.searchYear = 'invalid';
    component.searchWinnersByYear();
    expect(component.winnersByYear).toEqual([]);
  });
});
