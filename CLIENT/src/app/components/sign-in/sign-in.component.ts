
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/users';
import { Router } from '@angular/router';
import AuthStore from '../../stores/Auth';
import IdentifiedUserStore from '../../stores/IdentifiedUser';

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

  /**
   * Método que valida si exite en usuario y crea un token
   * @param user Objeto del tipo cliente
   */
  loginUser(user: User) {
    this.userService.validateUser(user).subscribe(
      (userWithId) => {
        this.userService.loginUser(user).subscribe(
          (userWithToken) => {
            IdentifiedUserStore.setUserIdentified(JSON.stringify(userWithId));
            AuthStore.setToken(JSON.stringify(userWithToken.token));
            if (user) {
              this.router.navigate(['home/' + '59b9717802d64c1188b71eb0']);
            }

            //this.router.navigate(['home/']);
          }, (response: Response) => {
            if (response.status === 500) {
              this.error = 'errorHasOcurred';
            }
          });
      }, (response: Response) => {
        if (response.status === 500) {
          this.error = 'errorHasOcurred';
        }
      });
  }

}
