import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Photo } from '../../models/photos';
import { PhotosService } from '../../services/photos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {
  /*public filesToUpload: Array<File>;*/
  @Input() accept: string;
  @Output() onFileSelect: EventEmitter<File[]> = new EventEmitter();
  @ViewChild('inputFile') nativeInputFile: ElementRef;
  private _files: File[];
  public newPhotoForm: FormGroup;

  get fileCount(): number { return this._files && this._files.length || 0; }

  constructor(
    private photosService: PhotosService,
    private formBuilder: FormBuilder,
  ) {

  }



  onNativeInputFileSelect($event) {
    this._files = $event.srcElement.files;
    this.onFileSelect.emit(this._files);
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }





  ngOnInit() {
    this.newPhotoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    }

    );
  }

  /*public fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }*/

  upload() {
    console.log('upload');
  }


  createNewPhoto(newPhoto: Photo) {
    this.photosService.createPhoto(newPhoto).subscribe((newPhotoWithId) => {
      /*this.heroes.push(newHeroWithId);
      this.myNgForm.resetForm();*/
    }, (response: Response) => {
      if (response.status === 500) {
        //this.error = 'errorHasOcurred';
      }
    });
  }


}
