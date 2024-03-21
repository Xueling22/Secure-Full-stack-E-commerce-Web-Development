import { JsonPipe } from '@angular/common';
import { createInjectableType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries:Country[]=[];
  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];

  constructor(
    private formbuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formbuilder.group({
      customer: this.formbuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formbuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: [''],
      }),
      billingAddress: this.formbuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipcode: [''],
      }),
      creditCard: this.formbuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    //populate 增添数据年月
    const startMonth: number = new Date().getMonth() + 1;

    this.luv2ShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        this.creditCardMonths = data;
      });

    this.luv2ShopFormService.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });

    //populate country
    this.luv2ShopFormService.getCountries().subscribe(
      data=>{
        this.countries=data;
      }
    );
  }

  onSubmit() {
    console.log('submit了');
  }

  copyShipppingAddressToBillingAddress(event: Event) {
    console.log('Checkbox change event triggered');
    const target = event.target as HTMLInputElement; // 使用类型断言
    if (target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value //这里只是html上显示的东西同步了，但是state[]列表也需要同步过去，就需要下面的一句
      );
      this.billingAddressStates=this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates=[];
    }
  }

  handleMonthsAndYears(){
    console.log("进函数了")
    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
    const currentYear:number=new Date().getFullYear();
    const selectedYear:number=Number(creditCardFormGroup!.value.expirationYear);
    //当前年显示剩下年，其他年显示完整年
    let startMonth:number=1;
    if(currentYear===selectedYear){
      startMonth=new Date().getMonth()+1;
    }else{
      startMonth=1;
      console.log("应该变了")
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data=>{
        this.creditCardMonths=data;
      }
    )
  }

  getStates(formGroupName:string){
    const formGroup=this.checkoutFormGroup.get(formGroupName);
    const countryCode=formGroup!.value.country.code;
    const countrName=formGroup!.value.country.name;

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data=>{
        if(formGroupName==='shippingAddress'){
          this.shippingAddressStates=data;
        }else{
          this.billingAddressStates=data;
        }

        //select first item by default
        formGroup!.get('state')!.setValue(data[0]);
      }
    )

  }
}
