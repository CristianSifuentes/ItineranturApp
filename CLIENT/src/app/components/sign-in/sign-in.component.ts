
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/users';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public signinForm: FormGroup;
  public error: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }

    );
  }

  loginUser(user: User) {
    this.userService.loginUser(user).subscribe(
      (newUserWithId) => {
      console.log('logeado');
      this.router.navigate(['home/']);
      /*this.users.push(newUserWithId);
      this.myNgForm.resetForm();*/
    }, (response: Response) => {
      console.log('no logeado');
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

}
