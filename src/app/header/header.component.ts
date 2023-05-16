import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router)
  {

  }

  GoToInventory(){
    this.router.navigate(['inventory']);
  }

  GoToContact(){
    this.router.navigate(['contact_us']);
  }
  GoToSignup(){
    this.router.navigate(['sign_up']);
  }
}
