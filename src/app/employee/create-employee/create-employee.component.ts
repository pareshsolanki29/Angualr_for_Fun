import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  validationMessages = {
    'fullName':{
      'required': 'Full Name is Required',
      'minLength': ' Full Name should have more than 2 Letters'
    },
    'email':{'required':'is Required'},
    'skillName':{
      'required':"is  required"
    },
    'experienceInYears':{
      'required':"is  required"
    },
    'proficiency':{
      'required':"is  required"
    }}

    formErrors = {
      'fullName': '',
      'skillName': '',
      'experienceInYears': '',
      'proficiency': ''
    }

  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group ({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email:  ['', [Validators.email,Validators.required]],
      skills: this.fb.group({
          skillName: ['', Validators.required],
          experienceInYears :  ['', Validators.required],
          proficiency: ['', Validators.required]
        }),
 
      })
 
   this.employeeForm.valueChanges.subscribe((data)=> {
     this.logValidationErrors(this.employeeForm);
   })
    }

    logValidationErrors(group: FormGroup = this.employeeForm): void{
      Object.keys(group.controls).forEach((key: string)=>{
        const abstractControl = group.get(key);
        if(abstractControl instanceof FormGroup){
          this.logValidationErrors(abstractControl)
        }else{
          this.formErrors[key] = ' ';
          if(abstractControl && !abstractControl.valid){
             const messages = this.validationMessages[key];
             for(let errorKey in abstractControl.errors){
               if(errorKey){
                 this.formErrors[key]+= messages[errorKey]+ ' ';
                 console.log(this.formErrors)
               }
             }
          }
        }
      })
  }
    onLoadData() :void{
    // this.logValidationErrors(this.employeeForm)
  
        }

 
  onSubmit():void {
    console.log(this.employeeForm)
  }

}
