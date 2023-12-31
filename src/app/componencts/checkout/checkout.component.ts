import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShopFormService} from "../../services/shop-form.service";
import {Country} from "../../common/country";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup: FormGroup;


  totalPrice = 0;
  totalQuantity = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = []
  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService) {
  }

  ngOnInit() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [""],
        lastName: [""],
        email: [""],
      }),
        shippingAddress: this.formBuilder.group({
          street:[""],
          country: [""],
          zipCode: [""],
          city: [""],
          state: [""]
        }),
      billingAddress: this.formBuilder.group({
        street:[""],
        country: [""],
        zipCode: [""],
        city: [""],
        state: [""]
      }),
      creditCard: this.formBuilder.group({
        cardType:[""],
        nameOnTheCard: [""],
        cardNumber: [""],
        securityCode: [""],
        expirationMonth: [""],
        expirationYear: [""]
      })
    })

    //ppopulate credit card months
    const startMonth: number = new Date().getMonth()+1;
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )

    //populate credit card years
    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )

    //populate countries
    this.shopFormService.getCountries().subscribe(
      data =>{
        console.log("Retrieved countries:" + JSON.stringify(data))
        this.countries = data;
      }
    )
  }

  onSubmit(){
    console.log("Handling the submit button")
    console.log(this.checkoutFormGroup.get("customer").value);
  }

  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

    }

  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear)

    //if the current year equals selected year, then start with the current mornth

    let startMonth:number;
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() +1;

    }else{
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }

  protected readonly event = event;
}
