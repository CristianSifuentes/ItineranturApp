import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { PhotosService } from './services/photos.service';
import { Photo } from '././models/photos';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public photos: Photo[];
  
  constructor(   private photosService: PhotosService) {
    this.photos = this.photosService.getAll();

   }

  ngOnInit() {
  }
}
