import { Component, OnInit } from '@angular/core';
import { SectionsService } from '../../services/sections.service';
import { Section } from '../../model/section.model';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  sections: Section[];

  constructor(private sectionsService: SectionsService) { }

  ngOnInit() {
    this.loadSections();
  }

  loadSections() {
    this.sectionsService.getSectionsList().subscribe(
      data => {
        this.sections = data;
      }
    );
  }

}
