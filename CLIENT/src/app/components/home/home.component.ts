import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { PhotosService } from '../../services/photos.service';
import { Photo } from './../../models/photos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public photos: Photo[];
  constructor(   private photosService: PhotosService) {
    this.photos = this.photosService.getAll();
   }

  ngOnInit() {
  }

}
