
import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MdIconRegistry } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { User } from './../../models/users';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.scss']
})
export class TravellersComponent implements OnInit {

  public users: User[];
  public hideSidebar;
  public cols: Observable<number>;
  public url: string;
  public url_user: string;

  constructor(
    private observableMedia: ObservableMedia,
    private iconRegistry: MdIconRegistry,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.userService.getAllTravellers("59ebf97051638e4b98dc7d52").subscribe(
      (users: Array<User>) => {
        if (users) {
          this.users = users;
        }
      }, (error) => {
        console.log(error);
      }, function () { console.log('uno mas'); }
    );
    /*this.route.params.subscribe(params => {
      if (params['id']) {
        console.log(params['id']);
        this.userService.getAllTravellers(params['id']).subscribe(
          (users: Array<User>) => {
            if (users) {
              this.users = users;
            }
          }, (error) => {
            console.log(error);
          }, function () { console.log('uno mas'); }
        );
      }
    });*/
  }

  ngOnInit() {
  }

}
