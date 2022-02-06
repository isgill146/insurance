import { Component, OnInit } from '@angular/core';
import { ChartType, Row } from "angular-google-charts";
import { FormGroup, FormControl } from '@angular/forms';
import { PolicyService } from 'src/app/services/policy/policy.service';
import { RegionService } from 'src/app/services/region/region.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  myType = ChartType.BarChart;

  options = {
    title: "Monthly Policy Distribution",
    width: 1250,
    height: 760,
    bar: { groupWidth: "20%" },
    legend: { position: "none" },
  };

  barData: Array<any> = new Array();
  regions: Array<any> = new Array();
  defaultSelectedRegion: String = 'All';

  constructor(private policyService: PolicyService, private regionService: RegionService) {
  }

  ngOnInit(): void {

    //Set Data
    this.setBarData('All');
    this.setRegionData();
  }


  //  Get Bar Data according to region
  onRegionChange(data: any) {
    this.setBarData(data.value);
  }



  //API FUNCTIONS


  // Get Bar Data
  setBarData(regionName: string) {
    let param = { regionName };

    this.policyService.getMonthlyPolicyCount(param).subscribe((res: any) => {
      this.barData = new Array();
      for (const i in res.body.monthlyCountObject) {
        this.barData.push([i, res.body.monthlyCountObject[i]]);
      }
    }), (err: any) => {
      console.log(err);
    }
  }


  // Get Region Data
  setRegionData() {
    this.regionService.getAllRegions().subscribe((res: any) => {
      this.regions = res.body;
      this.regions.unshift({ 'name': 'All' });
    }), (err: any) => {
      console.log(err);
    }
  }


}
