import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.css']
})
export class ExamCardComponent implements OnInit {
  @Input() exam: any = {};
  @Input() isAdmin: boolean;
  @Output() viewResultsEvent: EventEmitter<boolean>;

  constructor(private router: Router) {
    this.viewResultsEvent = new EventEmitter();
  }

  ngOnInit() {
  }

  showResults() {
    this.viewResultsEvent.emit(this.exam);
  }

  playExam(id) {
    this.router.navigate(['/exam', id]);
  }

}
