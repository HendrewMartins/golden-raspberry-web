import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Movie } from '../../model/movie';
import { MovieService } from '../service/movie.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  displayedColumns = ['id', 'year', 'title', 'winner'];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  filterYear: number | null = null;
  filterWinner: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    const winner = this.filterWinner === '' ? undefined : this.filterWinner === 'true';
    this.movieService.getMovies(this.pageIndex, this.pageSize, winner, this.filterYear ?? undefined)
      .subscribe(response => {
        this.movies = response.content;
        this.totalElements = response.totalElements;
      });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadMovies();
  }

  onFilterChange() {
    this.pageIndex = 0; // reset para primeira página
    this.loadMovies();
  }
}
