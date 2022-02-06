import { Component, OnInit } from '@angular/core';
import { ChartType, Row } from "angular-google-charts";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myType = ChartType.BarChart;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  options = {
    title: "Monthly Policy's Distribution",
    width: 1250,
    height: 830,
    bar: { groupWidth: "15%" },
    legend: { position: "none" },
  };

  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000]
  ];

  region: Array<any> = [];
  defaulSelectedRegion: String = 'All';

  constructor() {
    //TODO API
    this.region = ['All', 'North', 'South', 'East', 'West']
  }

  ngOnInit(): void {

  }

}
