import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateFormDirty, UpdateFormValue } from '@ngxs/form-plugin';
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { MyAddress } from '../actions/my-address.action';
import { Address } from '../models/address';

export class MyAddressStateModel{
    address!: Address[];
    addresForm: any;
}
const defaults = { address: [{
    addressName:" ",
    street:"",
    apartmentNumber:1,
    area:"",
    postCode:"",
    authorizedPerson:"",
}],
addresForm: {
  model: undefined,
  dirty:false,
  status: '',
  errors: {}
}
}
@State<MyAddressStateModel>({
  name: 'MyAddressState',
  defaults: defaults,
})
@Injectable()
export class MyAddressState {
  constructor(private http: HttpClient, private store: Store) {}

  @Selector()
  static myAddress({ myAddress }: any): MyAddress {
    return myAddress;
  }

  @Action(MyAddress)
  add({ getState, patchState }: StateContext<MyAddress>, { myAddress }: any) {
    const state = getState();
    sessionStorage.setItem('ActionName', 'ToastAction');
    console.log(sessionStorage.getItem('ActionName'));
    patchState({ myAddress });
    this.clearForm('MyAddressState.addressForm', defaults.addresForm.model);
  }

  clearForm(path: string, value: any) {
    this.store.dispatch(new UpdateFormValue({ value, path }));
    this.store.dispatch(new UpdateFormDirty({ dirty: false, path }));
  }
}
