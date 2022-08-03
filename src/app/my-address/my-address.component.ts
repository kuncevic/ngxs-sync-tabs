import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { MyAddress } from '../store/actions/my-address.action';
import { MyAddressState } from '../store/states/my-address.state';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css'],
})
export class MyAddressComponent implements OnInit {
  addressForm!: FormGroup;

  get isAddressFormValid(): boolean {
    return this.addressForm.status === 'VALID';
  }

  @Select(MyAddressState.myAddress)
  address$: any;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.addressForm = this.fb.group({
      addressName: ['', Validators.required],
      street: ['', Validators.required],
      apartmentNumber: [null, Validators.required],
      area: ['', Validators.required],
      postCode: ['', Validators.required],
      authorizedPerson: ['', Validators.required],
    });
  }

  submit(data: any) {
    this.store.dispatch(new MyAddress(data));
  }
  /*
  onSubmit(){
    if (this.isAddressFormValid) {
      this.store.dispatch(new MyAddress());
    }
  }
  */
}
