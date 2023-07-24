import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
        securityCode: [""],
        expirationMonth: [""],
        expirationYear: [""]
      })
    })
  }

  onSubmit(){
    console.log("Handling the submit button")
    console.log(this.checkoutFormGroup.get("customer").value);
  }
}
