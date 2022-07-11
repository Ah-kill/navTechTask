import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent implements OnInit {
  loginForm: FormGroup | undefined;

  constructor(public orderService : OrdersService,private modalService: NgbModal,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
   remove(id : any){
    this.orderService.remove(id);
   }

   open(content : any,id : number) {
    this.setupForm(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       if(this.loginForm && id === 0){
          this.orderService.add({
          buyerName : this.loginForm.value.buyerName,
          address : this.loginForm.value.address,
          total : this.loginForm.value.total,
          dueDate : new Date(this.loginForm.value.dueDate.year,this.loginForm.value.dueDate.month - 1,this.loginForm.value.dueDate.day).getTime(),
          id: Math.floor(Math.random() * 100000)
       });
       this.clearForm();
      }
      if(this.loginForm && id !== 0){
        this.orderService.edit({
        buyerName : this.loginForm.value.buyerName,
        address : this.loginForm.value.address,
        total : this.loginForm.value.total,
        dueDate : new Date(this.loginForm.value.dueDate.year,this.loginForm.value.dueDate.month - 1,this.loginForm.value.dueDate.day).getTime(),
        id: 1
     });
     this.clearForm();
    }
    }, (reason) => {
    this.clearForm();
    })
  }

  createForm(){
   this.loginForm = this.fb.group({
     buyerName : ['' , [Validators.required]],
     address : ['' ,[Validators.required]],
     total :  ['' ,[Validators.required]],
     dueDate : ['' ,[Validators.required]],
   })
}

setupForm(id : number){
if(id !== 0) {
let order = this.orderService.get(id);
this.loginForm?.patchValue({
  address : order.address,
  buyerName : order.buyerName,
  total : order.total,
  dueDate : {
    year : new Date(order.dueDate).getFullYear(),
    month : new Date(order.dueDate).getMonth(),
    day : new Date(order.dueDate).getDay()
  }
})
}
}

clearForm(){
  this.loginForm?.patchValue({
    address : '',
    buyerName : '',
    total :'',
    dueDate : null
  })
}
}  
