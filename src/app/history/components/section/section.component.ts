import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionsService } from '../../services/sections.service';

import { Section } from '../../model/section.model';
import { Level } from '../../model/level.model';
import { FormattedTextComponent } from '../../../shared/components/formatted-text/formatted-text.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  @ViewChild(FormattedTextComponent) text;
  codSection: string;
  section: Section = new Section();
  levelsMain: Level[];
  levelsOptional: Level[];

  constructor(private activatedRoute: ActivatedRoute,
    private sectionsService: SectionsService,
    private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.codSection = params['cod'];
    });
  }

  ngOnInit() {
    this.loadLevels();
  }

  loadLevels() {
    this.sectionsService.getSection(this.codSection)
      .subscribe(
      data => {
        this.section = data;
        this.levelsMain = data.levels.filter(level => level.main).sort((a, b) => a.name.localeCompare(b.name));
        this.levelsOptional = data.levels.filter(level => !level.main).sort((a, b) => a.name.localeCompare(b.name));
      }, 
      error => {
        this.router.navigate( ['/sections'] );
      }
      );
  }

  getChallangeDescription(i: number) {
    return this.section.challanges[i].challange.description;
  }

  getClass(i: number) {
    const base = 'list-group-item';

    return this.section.challanges[i].complete ?
      base + ' list-group-item-success' :
      base;
  }

}
