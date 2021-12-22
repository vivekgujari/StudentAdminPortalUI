import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';
import { addStudentRequest } from '../models/api-models/add-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44310';
  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<student[]>{
    return this.httpClient.get<student[]>(this.baseApiUrl + '/students');
  }

  getStudent(studentId : string): Observable<student>{
    return this.httpClient.get<student>(this.baseApiUrl + '/students/' + studentId);
  }

  updateStudent(studentId: string, studentRequest: student): Observable<student>{
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }

    return this.httpClient.put<student>(this.baseApiUrl + '/students/' + studentId, updateStudentRequest);
  }

  deleteStudent(studentId: string): Observable<student>{
    return this.httpClient.delete<student>(this.baseApiUrl + '/students/' + studentId);
  }

  addStudent(studentRequest: student): Observable<student>{
    const addStudentRequest: addStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    }

    return this.httpClient.post<student>(this.baseApiUrl + '/students/add', addStudentRequest);
  }

  uploadImage(studentId: string, file: File): Observable<any>{
    const formData = new FormData();
    formData.append("profileImage", file);
    return this.httpClient.post(this.baseApiUrl + '/students/' + studentId + '/upload-image',
    formData, {responseType: 'text'});
  }

  getImagePath(relativePath: string){
    return `${this.baseApiUrl}/${relativePath}`;
  }

}
