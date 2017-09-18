
import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MdIconRegistry } from '@angular/material';
import { PhotosService } from '../../services/photos.service';
import { Photo } from './../../models/photos';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  public photos: Photo[];
  public hideSidebar;
  public cols: Observable<number>;
  constructor(
    private observableMedia: ObservableMedia,
    private iconRegistry: MdIconRegistry,
    private photosService: PhotosService
  ) { 
      this.photos = this.photosService.getAll();
    }

    ngOnInit() {
      // set cols
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
