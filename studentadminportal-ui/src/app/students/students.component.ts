import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<student> = new MatTableDataSource<student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  filterString = '';

  constructor(private studentService: StudentService) { }

  @ViewChild(MatSort) matSort!: MatSort;
  ngOnInit(): void {
    // fetch students
    this.studentService.getStudent()
    .subscribe(
      (successResponse) =>{
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<student>(this.students);
        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }
      },
      (errorResponse) =>{
        console.log(errorResponse);
      }
    );
  }

  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
