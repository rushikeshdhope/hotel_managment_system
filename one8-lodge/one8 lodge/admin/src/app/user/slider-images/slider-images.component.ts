import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserAdminCommonServiceService } from 'src/app/user-admin-common-service.service';
import { mainresclass2 } from 'src/model/admin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-slider-images',
  templateUrl: './slider-images.component.html',
  styleUrls: ['./slider-images.component.css'],
})
export class SliderImagesComponent implements OnInit {
  ImageArray: any[] = [];
  ngOnInit(): void {
    this.GetSliderImages();
  }
  constructor(
    private service: UserAdminCommonServiceService,
    private toastr: ToastrService
  ) {}

  GetSliderImages() {
    
    this.service.getSliderImages().subscribe((res: mainresclass2) => {
      console.log('Image Res', res);

      if (res.response != null) {
        this.ImageArray = res?.response;
        this.ImageArray.reverse();
      } else {
      }

      // console.log("room type",this.RoomArray);
    });
  }

  deleteImage(id: number) {
    this.service.deleteSliderImages(id).subscribe((data) => {
      console.log('res delete image', data);

      if (data.message == 'DELETE IMAGE SUCCESFULLY') {
        this.GetSliderImages();

        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message);
      }
    });
  }

  formData = new FormData();
  Onimageselected(event: any) {
    const file = event.target.files?.[0];
    console.log('Image', file);

    this.formData.append('file', file);

    console.log('image upload', this.formData.get('file'));
  }

  uploadImage(fileInput: HTMLInputElement) {
    this.service.saveSliderImages(this.formData).subscribe((data) => {
      console.log('res insert image', data);

      if (data.message == 'IMAGE SAVE SUCCESFULLY') {
        this.GetSliderImages();
       
        fileInput.value = '';

        // Clear the formData
        this.formData = new FormData();
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message);
      }
    });


  }
}
