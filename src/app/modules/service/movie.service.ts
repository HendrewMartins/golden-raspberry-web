import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../list/model/movie-reponse';
import { environment } from '../../../environments/environment';

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

}


