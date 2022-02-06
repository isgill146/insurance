import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy/policy.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelService } from 'src/app/services/fuel/fuel.service';
import { IncomeGroupService } from 'src/app/services/income_group/income-group.service';
import { RegionService } from 'src/app/services/region/region.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {


  pageIndex: number = 0;
  pageSize: number = 6;
  search: string = '';
  policyArray: Array<any> = new Array();
  count: number = 0;
  updateDisplay = "none";

  fuelArray: Array<any> = new Array();
  incomeGroups: Array<any> = new Array();
  regions: Array<any> = new Array();

  policyID: number = 0;

  form: FormGroup = new FormGroup({
    policyID: new FormControl({ value: '', disabled: true }, Validators.required),
    purchaseDate: new FormControl({ value: '', disabled: true }, Validators.required),
    customerID: new FormControl({ value: '', disabled: true }, Validators.required),
    fuel: new FormControl('', Validators.required),
    vehicleSegment: new FormControl('', Validators.required),
    premium: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern(/\-?\d*\.?\d{1,2}/)]),
    bodilyInjuryLiability: new FormControl('', Validators.required),
    personalInjuryProtection: new FormControl('', Validators.required),
    propertyDamageLiability: new FormControl('', Validators.required),
    collision: new FormControl('', Validators.required),
    comprehensive: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    incomeRange: new FormControl('', Validators.required),
    region: new FormControl('true', Validators.required),
    customerMaritalStatus: new FormControl('', Validators.required)
  });

  constructor(private policyService: PolicyService, private fuelService: FuelService, private incomeGroupService: IncomeGroupService, private regionService: RegionService, private toastr: ToastrService) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.getPolicyList(this.pageIndex, this.pageSize, this.search)
  }



  // Search

  //Search Change
  onSearchChange(data: any) {
    this.getPolicyList(this.pageIndex, this.pageSize, this.search);
  }

  //Clear Search
  clearSearch() {
    this.search = '';
    this.getPolicyList(this.pageIndex, this.pageSize, this.search);
  }



  //Pagination

  //On page change or size change
  onPaginateChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getPolicyList(this.pageIndex, this.pageSize, this.search)
  }



  //MODALS

  //Open Modal
  openUpdateModal(item: any) {
    console.log(item);
    this.updateDisplay = "block";
    this.getFuels();
    this.getIncomeGroups();
    this.getRegions();
    this.setFormData(item);
  }

  //Close Modal
  onCloseUpdateHandled() {
    this.updateDisplay = "none";
  }


  //FORM

  //Set Modal Form Data
  setFormData(data: any) {
    this.form.controls['policyID'].setValue(data.policyID);
    this.form.controls['purchaseDate'].setValue(data.dateOfPurchase.split('T')[0]);
    this.form.controls['customerID'].setValue(data.customerID);
    this.form.controls['fuel'].setValue(data.fuel.type);
    this.form.controls['vehicleSegment'].setValue(data.vehicleSegment);
    this.form.controls['premium'].setValue(data.premium);
    this.form.controls['gender'].setValue(data.customer.gender);
    this.form.controls['incomeRange'].setValue(data.income_group.incomeRange);
    this.form.controls['region'].setValue(data.region.name);
    data.customerMaritalStatus ? this.form.controls['customerMaritalStatus'].setValue('true') : this.form.controls['customerMaritalStatus'].setValue('false');
    data.bodilyInjuryLiability ? this.form.controls['bodilyInjuryLiability'].setValue('true') : this.form.controls['bodilyInjuryLiability'].setValue('false');
    data.personalInjuryProtection ? this.form.controls['personalInjuryProtection'].setValue('true') : this.form.controls['personalInjuryProtection'].setValue('false');
    data.propertyDamageLiability ? this.form.controls['propertyDamageLiability'].setValue('true') : this.form.controls['propertyDamageLiability'].setValue('false');
    data.collision ? this.form.controls['collision'].setValue('true') : this.form.controls['collision'].setValue('false');
    data.comprehensive ? this.form.controls['comprehensive'].setValue('true') : this.form.controls['comprehensive'].setValue('false');

    this.policyID = data.policyID;
  }


  //Submit Updated Form
  updatePolicy() {
    if (this.form.valid) {
      console.log(this.form.value);
      let body = {
        policyID: this.policyID,
        vehicleSegment: this.form.value.vehicleSegment,
        premium: this.form.value.premium,
        bodilyInjuryLiability: this.form.value.bodilyInjuryLiability,
        fuel: this.form.value.fuel,
        personalInjuryProtection: this.form.value.personalInjuryProtection,
        propertyDamageLiability: this.form.value.propertyDamageLiability,
        collision: this.form.value.collision,
        comprehensive: this.form.value.comprehensive,
        gender: this.form.value.gender,
        incomeRange: this.form.value.incomeRange,
        region: this.form.value.region,
        customerMaritalStatus: this.form.value.customerMaritalStatus
      };
      this.policyService.updatePolicy(body).subscribe((res) => {
        console.log(res);
        this.getPolicyList(this.pageIndex, this.pageSize, this.search);
        this.toastr.success('Updated Successfully');
        this.onCloseUpdateHandled();
      }), (err: any) => {
        console.log(err);
      }
    }
  }


  //API Functions

  //Get Fuel Data
  getFuels() {
    this.fuelService.getListOfFuels().subscribe((res: any) => {
      this.fuelArray = res.body;
    }), (err: any) => {
      console.log(err);
    }
  }

  //Get Income Group Data
  getIncomeGroups() {
    this.incomeGroupService.getListOfIncomeGroups().subscribe((res: any) => {
      this.incomeGroups = res.body;
    }), (err: any) => {
      console.log(err);
    }
  }

  //Get Region Data
  getRegions() {
    this.regionService.getAllRegions().subscribe((res: any) => {
      this.regions = res.body;
    }), (err: any) => {
      console.log(err);
    }
  }

  //Get Policy Data
  getPolicyList(pageIndex: number, pageSize: number, search: string) {
    let param = { pageIndex, pageSize, search };

    this.policyService.getListOfPolicies(param).subscribe((res: any) => {
      this.count = res.body.count;
      this.policyArray = res.body.rows;
    }), (err: any) => {
      console.log(err);
    }
  }

}
