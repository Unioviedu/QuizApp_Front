import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.css']
})
export class ExamCardComponent implements OnInit {
  @Input() exam: any = {};
  @Input() isAdmin: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showResults() {
    
  }

  playExam(id) {
    this.router.navigate(['/exam', id]);
  }

}
