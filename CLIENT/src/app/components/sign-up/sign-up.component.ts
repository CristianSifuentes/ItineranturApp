import { UsersService } from './../../services/users.service';
import { User } from './../../models/users';
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signupForm: FormGroup;
  public users: User[];
  public error: string;
  myState = 'M';
  states = [{code: 'M', name: 'Masculino'}, {code: 'F', name: 'Femenino'}, {code: 'I', name: 'Indefinido'}];
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      nickname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  createUser(newUser: User) {
    this.userService.createUser(newUser).subscribe((newUserWithId) => {
      this.users.push(newUserWithId);
      this.myNgForm.resetForm();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

}
