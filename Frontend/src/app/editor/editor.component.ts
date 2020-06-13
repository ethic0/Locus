import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup,Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Order, OrderService, ModalService, ApiService, DisplayService } from '../core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  order: Order = {} as Order;
  orderForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private http:HttpClient,
   
    private ModalService:ModalService,
    private displayService:DisplayService,
    private OrderService:OrderService
  ) {}
  pickup_cities:any=['Delhi','Noida','Agra','Mathura'];
  drop_cities:any=['Gurugram','Mumbai','Chennai','Varanasi'];
  delivery_option:any=['Standard','Express'];

 

  ngOnInit() {
   
  this.orderForm= this.formBuilder.group({
    cust_name:['',[Validators.required]],
    email:['',[Validators.email]],
    cust_contact:['',[Validators.required,Validators.pattern(/^\d{10}$/), Validators.minLength(10)]],
    pickup_city:['',Validators.required],
    pickup_add:['',[Validators.minLength(10), Validators.required]],
    recv_name:['',[Validators.required]],
    recv_cont:['',[Validators.required,Validators.pattern(/^\d{10}$/), Validators.minLength(10)]],
    drop_city:['',Validators.required],
    recv_add:['',[Validators.minLength(10), Validators.required]],
    
    distance:['',[Validators.required]],
    pkg_length:['',[Validators.required]],
    pkg_breadth:['',[Validators.required]],
    pkg_height:['',[Validators.required]],
    pkg_wt:['',[Validators.required]],
    delivery_opt:['',Validators.required],
  }) 
  }

  changeP_city(e){
    console.log(e.value);
    this.pickup_city.setValue(e.target.value,{
      onlySelf: true
    })
  }
  changeD_city(e){
    console.log(e.value);
  this.drop_city.setValue(e.target.value,{
      onlySelf: true
    })
  }
  changedelivery(e){
    console.log(e.value);
    this.delivery_opt.setValue(e.target.value,{
      onlySelf: true
    })
  }

  
get pickup_city(){
	return this.orderForm.get('pickup_city')
}
get drop_city(){
  return this.orderForm.get('drop_city')
}

get delivery_opt(){
  return this.orderForm.get('delivery_opt')
}
get pkg_wt(){
  return this.orderForm.get('pkg_wt')
}
get distance(){
  return this.orderForm.get('distance')
}
get pkg_length(){
  return this.orderForm.get('pkg_length')
}
get pkg_breadth(){
  return this.orderForm.get('pkg_breadth')
}
get pkg_height(){
  return this.orderForm.get('pkg_height')
}

get f() { return this.orderForm.controls; }

area(){
  return this.pkg_length.value*this.pkg_breadth.value*this.pkg_height.value;
}




charges(){
  var charge =0;
  if(this.pkg_wt.value<=10 && this.distance.value<=100)
 return charge=2*this.distance.value;
  if(this.distance.value>100 && this.distance.value<=300)
  return charge=1*this.distance.value;
  if(this.distance.value>300)
  charge=0.75*this.distance.value;
  else{
    if(this.pkg_wt.value>10 && this.distance.value<=100)
  return charge=4*this.distance.value;
    if(this.distance.value>100 && this.distance.value<=300)
   return charge=3*this.distance.value;
    if(this.distance.value>300)
    charge=2.5*this.distance.value
  }
  if(this.area()>600)
 return charge=charge+50;
}

onSubmit() {
  console.log(this.orderForm.value);
   window.alert("Total Charge:"+ this.charges());
    this.isSubmitting = true;
    this.OrderService.save(this.order)
    .subscribe(data=> this.router.navigateByUrl('/' + data.slug),            
      err=>{
        this.errors=err;
        this.isSubmitting=false;
      });
    this.updateOrder(this.orderForm.value);
    // const formdata = this.orderForm.value;
  
   
    // sessionStorage.setItem('data','true');
   
}

 updateOrder(values:Object){
  Object.assign(this.orderForm,values);
 }

 
}
