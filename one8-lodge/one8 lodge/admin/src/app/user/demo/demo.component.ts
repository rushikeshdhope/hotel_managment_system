
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent   {

  isLoading$ = this.loaderService.isLoading$;

  constructor(private loaderService: UserService) {}

}
