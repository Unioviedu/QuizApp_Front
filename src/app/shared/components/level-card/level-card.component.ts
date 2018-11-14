import { Component, OnInit, Input } from '@angular/core';
import { Level } from '../../../history/model/level.model';
import { Router } from '@angular/router';
import {SectionsService } from '../../../history/services/sections.service'

@Component({
  selector: 'app-level-card',
  templateUrl: './level-card.component.html',
  styleUrls: ['./level-card.component.css']
})
export class LevelCardComponent implements OnInit {
  NAME_BADGE: string = "badge badge-"; 

  @Input() level: Level = new Level();

  classBadge: string;
  msgBadge: string;
  opacity: number = 1;
  disabledButton:boolean;

  constructor(private router: Router, private sectionsService: SectionsService) { }

  ngOnInit() {
    this.createBadge();
  }

  playLevel() {
    this.sectionsService.setCurrentLevel(this.level);
    this.router.navigate( ['/level', this.level.orden] );
  }

  createBadge() {
    if (!this.level.unlocked) {
        this.classBadge = this.NAME_BADGE+"danger";
        this.msgBadge = "Lock";
        this.opacity = 0.5;
        this.disabledButton = true;
    } else if (this.level.complete) {
        this.classBadge = this.NAME_BADGE+"success";
        this.msgBadge = "Complete"
    }
  }

}
