import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '../../../history/model/section.model';
import { SectionsService } from '../../../history/services/sections.service';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.css']
})
export class SectionCardComponent implements OnInit {
  NAME_BADGE: string = "badge badge-"; 

  @Input() section: Section = new Section();
  
  classBadge:string;
  msgBadge:string;
  opacity:number = 1;
  disabledButton:boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.createBadge();
  }

  verSection() {
    this.router.navigate( ['/section', this.section.orden] );
  }

  createBadge() {
    if (!this.section.unlocked) {
        this.classBadge = this.NAME_BADGE+"danger";
        this.msgBadge = "Lock";
        this.opacity = 0.5;
        this.disabledButton = true;
    } else if (this.section.completeAll) {
        this.classBadge = this.NAME_BADGE+"success";
        this.msgBadge = "Complete"
    }
  }

}
