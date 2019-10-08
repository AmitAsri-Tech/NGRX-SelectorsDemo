import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule, } from '@ngrx/store';

import { AppComponent } from './app.component';

const productsReducer = (state = [], action: {type: string, payload: any}) => {
  switch (action.type) {
    case '[Product] ADD':
      return [ ...state, {...action.payload}];
      case '[Product] DELETE':
        return state.filter(p => p.id !== action.payload.id);
        case '[Product] UPDATE':
      return state.map(p => {
        if(p.id === action.payload.id) {
          return { ...p, ...action.payload}
        } else {
          return p;
        }
      })
    default:
      return state;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      products: productsReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
