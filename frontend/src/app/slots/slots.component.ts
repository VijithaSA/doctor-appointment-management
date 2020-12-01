import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  modalRef: BsModalRef | null;
  slotsForm: FormGroup;
  submitted = false;
  isMeridian = false;
  readonly = true;
  fromTime = new Date();
  toTime = new Date();
  slotList:any = [];
  slotListFNoo:any = [];
  slotListANoo:any = [];
  noonType;

  constructor(private modalService: BsModalService,
  		private apiService:ApiService,
  	    private formBuilder: FormBuilder,
  	    private toastr:ToastrService) { 
	  this.maxDate.setDate(this.maxDate.getDate() + 7);
	  this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
  	this.slotsForm = this.formBuilder.group({
    });
  }

  get f() {
    return this.slotsForm.controls;
  }

  getSlotsByDate(){
  	this.slotListFNoo = [];
  	this.slotListANoo = [];
  	this.apiService.requestData('/slots/getSlotByDate',{date:new Date(this.bsInlineValue)}).subscribe((res:any)=>{
  		if(res.status){
  			this.slotList = res.data.map(items=>{
  				if(items.fromTime.split(':')[0] < 17){
  					this.slotListFNoo.push(items);
  				}else{
  					this.slotListANoo.push(items);
  				}
  			});
  		}
  	})
  }

  onValueChange(event){
  	this.bsInlineValue = event;
  	this.getSlotsByDate();
  }

  openPopup(template: TemplateRef<any>, type) {
    this.modalRef = this.modalService.show(template);
    this.noonType = type;
  }

  onSubmit(){
  	console.log('sbmitttedd')
  	this.submitted = true;
    let values = this.slotsForm.value;
    let fromHrs = this.fromTime.getHours();
    let toHrs = this.toTime.getHours();
    let fromMin = this.fromTime.getMinutes();
    let toMin = this.toTime.getMinutes();
    if(!this.fromTime || !this.toTime){
      return false;
    }
    this.noonType == 'morn' ? (fromHrs >= 9 || fromHrs <= 12) : (fromHrs >= 17 || fromHrs <= 21)
    if((fromHrs <= toHrs) && (Math.abs(toMin - fromMin) == 30) ){
    	let data = {
	      fromTime:fromHrs+':'+((fromMin == 0) ? '00' : fromMin),
	      toTime:toHrs+':'+((toMin == 0) ? '00' : toMin),
	      date:this.bsInlineValue,
	      day:this.bsInlineValue.getDay()
    	}
    
	    this.apiService.requestData('/slots/addSlots',data).subscribe((res:any)=>{
	      if(res.status){
	        this.submitted = false;
	        this.fromTime = new Date();
	        this.toTime = new Date();
	        this.modalService.hide();
	        this.getSlotsByDate();
	        this.toastr.success('Slot created Successfully', 'Success!!')
	      }else{
	        this.toastr.error(res.msg);
	      }
	    });
    }else{
    	this.toastr.error('Time Slots should be scheduled for 30 mins', 'Oops!!')
    }
  }

}
