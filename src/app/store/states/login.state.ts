import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Login, Logout } from '../actions/login.action';
import { MyAddress } from '../actions/my-address.action';

const defaults = {
  loginForm: {
  }
};

@State({
  name: 'LoginState',
  defaults: defaults,
})
@Injectable()
export class LoginState {
  constructor(private store: Store) {}

  @Action(Login)
  login({ getState, patchState }: StateContext<MyAddress>) {
    console.warn('Login');
  }

  @Action(Logout)
  Logout({ getState, patchState }: StateContext<MyAddress>) {
    console.warn('Logout');
    localStorage.clear();
  }
}
