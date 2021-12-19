import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44310';
  constructor(private httpClient: HttpClient) { }

  getStudent(): Observable<student[]>{
    return this.httpClient.get<student[]>(this.baseApiUrl + '/students');
  }
}
