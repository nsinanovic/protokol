import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistic } from './statistic';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  statistic$: Observable<Statistic[]>;
  monthlyReportData: Array<Array<any>>;
  monthlyReportColumns: Array<string>;
  monthlyReportType: string;
  monthlyReportWidth: number;

  constructor(private statistics: StatisticsService) { }

  ngOnInit() {
    this.statistic$ = this.statistics.getstatistics();
    this.monthlyReportData = [      
      ['Sep 2017', 30, 25],
      ['Okt 2017', 8, 17],
      ['Nov 2017', 2, 8],
      ['Dec 2017', 11, 25],
      ['Jan 2018', 10, 2],
      ['Feb 2018', 6, 4],
      ['Mar 2018', 2, 3],
      ['Apr 2018', 15, 40],  
      ['Maj 2018', 30, 25],
      ['Jun 2018', 8, 17],
      ['Jul 2018', 2, 8],
      ['Aug 2018', 11, 25]
    ];
    this.monthlyReportColumns = ['Mjesec', 'Ulazni dokumenti', 'Izlazni dokumenti'];
    this.monthlyReportType = "ColumnChart";
    this.monthlyReportWidth = 1000;
  }
}
