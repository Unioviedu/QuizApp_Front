import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results-exam',
  templateUrl: './results-exam.component.html',
  styleUrls: ['./results-exam.component.css']
})
export class ResultsExamComponent implements OnInit {
  chartView: boolean = false;
  results: any = {};

  doughnutChartLabels:string[] = ['Aprobados', 'Suspensos'];
  doughnutChartData:number[] = [];
  doughnutChartType:string = 'doughnut';

  constructor() {
  }

  ngOnInit() {
  }

  loadInfo() {
    let aprobados = 0;
    let suspensos = 0;

    for (let user in this.results) {
      let result = this.results[user];

      result.calification > 5 ? aprobados++ : suspensos++;
    }

    this.doughnutChartData.push(aprobados, suspensos);
  }

}
