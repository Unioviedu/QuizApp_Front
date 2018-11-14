import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbar') navBar;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goComponent(component: string) {
    this.router.navigate( [component] );

    jQuery(this.navBar.nativeElement).collapse('hide');
  }

}
