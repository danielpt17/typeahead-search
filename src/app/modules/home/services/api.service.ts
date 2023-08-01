import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private apiUrl = 'https://api.chucknorris.io/jokes/search?query=';

  constructor(private http: HttpClient) {}

  searchData(query: string): Observable<any[]> {
    const endpoint = `${this.apiUrl}${query}`; 
    return this.http.get<any[]>(endpoint);
  }
}