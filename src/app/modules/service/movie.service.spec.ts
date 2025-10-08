import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { environment } from '../../../environments/environment';
import { MovieResponse } from '../../model/movie-reponse';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMovies should call correct URL and return data', () => {
    const mockResponse: MovieResponse = {
      content: [],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      pageSize: 10
    };

    service.getMovies(0, 10, true, 2020).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request =>
      request.url === `${baseUrl}/movies` &&
      request.params.get('page') === '0' &&
      request.params.get('size') === '10' &&
      request.params.get('winner') === 'true' &&
      request.params.get('year') === '2020'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getYearsWithMultipleWinners should call correct URL', () => {
    const mockResponse = { years: [] };

    service.getYearsWithMultipleWinners().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/movies/yearsWithMultipleWinners`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getTopStudiosWithWinCount should call correct URL', () => {
    const mockResponse = { studios: [] };

    service.getTopStudiosWithWinCount().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/movies/studiosWithWinCount`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getWinIntervals should call correct URL', () => {
    const mockResponse = {
      max: [],
      min: []
    };

    service.getWinIntervals().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/movies/maxMinWinIntervalForProducers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getWinnersByYear should call correct URL with params', () => {
    const year = 2021;
    const mockResponse = [
      {
        id: 1,
        year: 2021,
        title: 'Movie 1',
        studios: ['Studio A'],
        producers: ['Producer A'],
        winner: true
      }
    ];

    service.getWinnersByYear(year).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request =>
      request.url === `${baseUrl}/movies/winnersByYear` &&
      request.params.get('year') === year.toString()
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
