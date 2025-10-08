import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../../model/movie-reponse';
import { environment } from '../../../environments/environment';
import { YearWithMultipleWinners } from '../../model/year-with-multiple-winners';
import { StudioWithWinCount } from '../../model/studio-with-win-count';
import { WinIntervalResponse } from '../../model/win-interval-response';
import { MovieWinner } from '../../model/movie-winner';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  getMovies(page: number, size: number, winner?: boolean, year?: number): Observable<MovieResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (winner !== undefined) {
      params = params.set('winner', winner.toString());
    }
    if (year !== undefined) {
      params = params.set('year', year.toString());
    }

    return this.http.get<MovieResponse>(`${this.baseUrl}/movies`, { params });
  }


  getYearsWithMultipleWinners(): Observable<{ years: YearWithMultipleWinners[] }> {
    return this.http.get<{ years: YearWithMultipleWinners[] }>(`${this.baseUrl}/movies/yearsWithMultipleWinners`);
  }


  getTopStudiosWithWinCount(): Observable<{ studios: StudioWithWinCount[] }> {
    return this.http.get<{ studios: StudioWithWinCount[] }>(`${this.baseUrl}/movies/studiosWithWinCount`);
  }


  getWinIntervals(): Observable<WinIntervalResponse> {
    return this.http.get<WinIntervalResponse>(`${this.baseUrl}/movies/maxMinWinIntervalForProducers`);
  }


  getWinnersByYear(year: number): Observable<MovieWinner[] | MovieWinner> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<MovieWinner[] | MovieWinner>(`${this.baseUrl}/movies/winnersByYear`, { params });
  }

}


