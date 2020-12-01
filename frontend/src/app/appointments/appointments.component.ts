import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
	appointmentList:any = [];
	appointmentForm: FormGroup;
  	submitted = false;
  	slotsAvailable:any = [];
  	date = new Date();
  	modalRef: BsModalRef | null;

  constructor(private modalService: BsModalService,
  		private apiService:ApiService,
  	    private formBuilder: FormBuilder,
  	    private toastr:ToastrService) { }

  ngOnInit(): void {
  	this.getAppointments();
  	this.getSlotLists();
  	 this.appointmentForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      mobNo: ['', Validators.required],
      date: ['', Validators.required],
      slotId:['', Validators.required]
    });
  }

   get f() {
    return this.appointmentForm.controls;
  }

  openPopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getAppointments(){
  	this.apiService.getData('/appointment/getAppointments').subscribe((res:any)=>{
  		if(res.status){
  			this.appointmentList = res.data;
  		}
  	})
  }

  onValueChange(event){
  	this.date = event;
  	this.getSlotLists();
  }

  getSlotLists(){
  	this.apiService.requestData('/slots/getSlot',{date:new Date(this.date)}).subscribe((res:any)=>{
   		if(res.status){
  			this.slotsAvailable = res.data;
  		}
  	})
  }


  onSubmit(){
    this.submitted = true;
    let values = this.appointmentForm.value;
    if(!values.patientName || !values.mobNo){
      return false;
    }
    let data = {
      patientName:values.patientName,
      mobNo:values.mobNo,
      appointmentDate:this.date,
      slotId:values.slotId
    }
    
    this.apiService.requestData('/appointment/bookAppointment',data).subscribe((res:any)=>{
      if(res.status){
        this.submitted = false;
        this.appointmentForm.reset();
        this.modalService.hide();
        this.getAppointments();
        this.toastr.success('Created Successfully', 'Success!')
      }else{
        // this.toastr.error(res.msg);
      }
    })
  }

}
