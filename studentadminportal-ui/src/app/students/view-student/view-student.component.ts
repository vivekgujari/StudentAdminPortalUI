import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { student } from '../../models/ui-models/student.model'
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null | undefined;
  student: student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }
  isNewStudent = false;
  header = '';
  genderList: Gender[] = [];
  constructor(private studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar,
    private router: Router) {

   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if(this.studentId){

          if(this.studentId.toLowerCase() === 'Add'.toLowerCase())
          {
            this.isNewStudent = true;
            this.header = 'Add New Student';
          }else{
            this.isNewStudent = false;
            this.header = 'Edit Student';
            this.studentService.getStudent(this.studentId)
            .subscribe(
              (successResponse) => {
                this.student = successResponse;
              }
            );
          }

          this.genderService.getGenderList()
          .subscribe(
          (successResponse) => {
            this.genderList = successResponse;
          });
        }
      }
    );
  }

  onUpdate(): void{
    this.studentService.updateStudent(this.student.id, this.student)
    .subscribe(
      (successResponse) => {
        this.snackbar.open('Student updated successfully', undefined, {
          duration: 2000
        });
      },
      (errorResponse) => {

      }
    );
  }

  onDelete(): void{
    this.studentService.deleteStudent(this.student.id)
    .subscribe(
      (successResponse) =>{
        this.snackbar.open('Student deleted successfully', undefined, {
          duration: 2000
        });

        setTimeout(() =>{
          this.router.navigateByUrl('students');
        }, 2000
        );

      },
      (errorResponse) =>{

      }
    );
  }

  onAdd(): void{
    this.studentService.addStudent(this.student)
    .subscribe(
      (successResponse) =>{
        this.snackbar.open('Student added successfully', undefined, {
          duration: 2000
        });
        setTimeout(() =>{
          this.router.navigateByUrl(`students/${successResponse.id}`);
        }, 2000
        );
      },
      (errorResponse) =>{

      }
    );
  }

}
