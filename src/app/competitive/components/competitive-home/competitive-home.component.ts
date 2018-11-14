import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competitive-home',
  templateUrl: './competitive-home.component.html',
  styleUrls: ['./competitive-home.component.css']
})
export class CompetitiveHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createQuestion() {
    this.router.navigate( ['/createQuestion'] );
  }

  play() {
    this.router.navigate( ['/playQuestion'] );
  }

}
