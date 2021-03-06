
import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MdIconRegistry } from '@angular/material';
import { PhotosService } from '../../services/photos.service';
import { Photo } from './../../models/photos';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public photos: Photo[];
  public hideSidebar;
  public cols: Observable<number>;
  public url: string;
  public url_user: string;
  constructor(
    private observableMedia: ObservableMedia,
    private iconRegistry: MdIconRegistry,
    private photosService: PhotosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.url = 'http://localhost:3977/api/photo/';
    this.url_user = 'http://localhost:3977/api/user/';
    console.log(this.router.url);
    console.log(this.route.url);
    this.route.params.subscribe(params => {
      if (params['id']) {
        console.log(params['id']);
        this.photosService.getAllPhotosForUser(params['id']).subscribe(
          (photos: Array<Photo>) => {
            if (photos) {
              this.photos = photos;
            }
          }, (error) => {
            console.log(error);
          }, function () { console.log('uno mas'); }
        );
      }
    });
  }

  ngOnInit() {
    if (this.observableMedia.isActive('xs')) {
      this.cols = Observable.of(1);
    } else if (this.observableMedia.isActive('sm') || this.observableMedia.isActive('md')) {
      this.cols = Observable.of(2);
    } else if (this.observableMedia.isActive('lg') || this.observableMedia.isActive('xl')) {
      this.cols = Observable.of(4);
    }
    // observe changes
    this.observableMedia.asObservable()
      .subscribe(change => {
        switch (change.mqAlias) {
          case 'xs':
            return this.cols = Observable.of(1);
          case 'sm':
          case 'md':
            return this.cols = Observable.of(2);
          case 'lg':
          case 'xl':
            return this.cols = Observable.of(4);
        }
      });
  }

}
