import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitiveService } from '../../services/competitive.services';

declare var jQuery: any;

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  @ViewChild('modalCreated') myModal;

  constructor(private router: Router, private service: CompetitiveService) { }

  ngOnInit() {
  }

  newQuestion(newQuestion: any) {
    this.service
      .createNewQuestion(newQuestion).subscribe(
        data => {
          jQuery(this.myModal.nativeElement).modal('show');
        },
        error => {
            
        });
  }

  continue() {
    this.router
      .navigateByUrl('/RefrshComponent', {skipLocationChange: true})
      .then(() =>
          this.router.navigate(['/createQuestion'])
      );
  }

  exit() {
    this.router.navigate(['/competitive']);
  }


}
