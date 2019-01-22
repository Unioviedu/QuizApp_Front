import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-exam',
  templateUrl: './results-exam.component.html',
  styleUrls: ['./results-exam.component.css']
})
export class ResultsExamComponent implements OnInit {
  results: any = {};

  constructor() {
  }

  ngOnInit() {
  }

}
