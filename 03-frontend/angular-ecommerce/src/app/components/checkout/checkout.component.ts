import { createInjectableType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice:number=0;
  totalQuantity:number=0;

  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup=this.formbuilder.group({
        customer:this.formbuilder.group({
          firstName:[''],
          lastName:[''],
          email:['']
        }),
        shippingAddress:this.formbuilder.group({
          street:[''],
          city:[''],
          state:[''],
          country:[''],
          zipcode:['']
        }),
        billingAddress:this.formbuilder.group({
          street:[''],
          city:[''],
          state:[''],
          country:[''],
          zipcode:['']
        }),
        creditCard:this.formbuilder.group({
          cardType:[''],
          nameOnCard:[''],
          cardNumber:[''],
          securityCode:[''],
          expirationMonth:[''],
          expirationYear:['']
        })
      })
  }

  onSubmit(){
    console.log("submit了");
  }

  copyShipppingAddressToBillingAddress(event: Event) {
    console.log('Checkbox change event triggered');
  const target = event.target as HTMLInputElement; // 使用类型断言
  if(target.checked) {
    this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
  } else {
    this.checkoutFormGroup.controls['billingAddress'].reset();
  }
}

}
