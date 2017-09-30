import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Photo } from '../../models/photos';
import { PhotosService } from '../../services/photos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthStore from '../../stores/Auth';
import AuthIdentifiedUserStore from '../../stores/IdentifiedUser';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {

  @Input() accept: string;
  @Output() onFileSelect: EventEmitter<File[]> = new EventEmitter();
  @ViewChild('inputFile') nativeInputFile: ElementRef;
  private _files: File[];
  public newPhotoForm: FormGroup;
  public url: string;
  public url_user: string;
  get fileCount(): number { return this._files && this._files.length || 0; }
  public photo: Photo;
  private token: any;
  private identified_user: any;
  constructor(
    private photosService: PhotosService,
    private formBuilder: FormBuilder,
  ) {
    this.url = 'http://localhost:3977/api/photo/';
    this.url_user = 'http://localhost:3977/api/user/';
  }


  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }


  onNativeInputFileSelect($event) {
    this._files = $event.srcElement.files;
    /*this.onFileSelect.emit(this._files);*/
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = function (e) {
      console.log(myReader.result);
      $('#image').attr('src', myReader.result);
    }
    myReader.readAsDataURL(inputValue.files[0]);
  }


  ngOnInit() {
    this.newPhotoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    }

    );
  }

  upload() {
    console.log('upload');
  }


  createNewPhoto(newPhoto: Photo) {
    this.token = AuthStore.getToken();
    this.identified_user = AuthIdentifiedUserStore.getUserIdentified();
    if (this.token && this.identified_user) {
      let user = JSON.parse(this.identified_user);
      newPhoto.user = user._id;
      this.photosService.createPhoto(newPhoto).subscribe(
        (photo: Photo) => {
          this.photo = photo;
          if (this.photo) {
            this.fileRequest(
              this.url + 'uploadPhoto/' + this.photo._id,
              this.token,
              [],
              this._files).then(
              (result: any) => {
                /*this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user));
                let imagePath = this.url + 'obtenerImagenUsuario/' + this.user.image;
                document.getElementById('image-logged').setAttribute('src', imagePath);
                console.log(this.user);*/
                console.log(result);
              }
              );
          }
        }, (response: Response) => {
          if (response.status === 500) {
            //this.error = 'errorHasOcurred';
          }
        });
    }

  }

  public fileRequest(url: string, token: string, params: Array<string>, files: Array<File>) {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name)
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }

        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);

    });

  }


}
