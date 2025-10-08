import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { YearWithMultipleWinners } from '../../model/year-with-multiple-winners';
import { StudioWithWinCount } from '../../model/studio-with-win-count';
import { WinIntervalResponse } from '../../model/win-interval-response';
import { MovieWinner } from '../../model/movie-winner';
import { MovieService } from '../service/movie.service';
import { TableGenericComponent } from '../../components/table/table-generic.component';


@Component({
  selector: 'app-movie-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    TableGenericComponent
  ],
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent {
  private movieService = inject(MovieService);

  years: YearWithMultipleWinners[] = [];
  studios: StudioWithWinCount[] = [];
  intervals?: WinIntervalResponse;
  winnersByYear: MovieWinner[] = [];

  searchYear: string = '';
  yearsColumns = ['year', 'winnerCount'];
  studiosColumns = ['name', 'winCount'];
  intervalColumns = ['producer', 'interval', 'previousWin', 'followingWin'];
  winnersColumns = ['id', 'year', 'title'];

  constructor() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.movieService.getYearsWithMultipleWinners().subscribe(res => this.years = res.years);
    this.movieService.getTopStudiosWithWinCount().subscribe(res => this.studios = res.studios.slice(0, 3));
    this.movieService.getWinIntervals().subscribe(res => this.intervals = res);
  }

  searchWinnersByYear() {
    const year = parseInt(this.searchYear, 10);
    if (!isNaN(year)) {
      this.movieService.getWinnersByYear(year).subscribe(res => {
        this.winnersByYear = Array.isArray(res) ? res : [res];
      });
    } else {
      this.winnersByYear = [];
    }
  }
}
