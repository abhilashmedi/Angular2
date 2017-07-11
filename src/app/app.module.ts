import { mainReducer } from './../State/main-reducer';
import { State, intitialState } from './../State/main-state';
import { GoogleSigninComponent } from './../Login/GoogleLogin.component';
import { AuthGuard } from './../routes/auth-guard.service';
import { UserService } from './../Users/user.service';
import { CreateUserComponent } from './../Users/createuser.component';
import { OnFocusDirective } from './../Users/onfocus.directive';
import { UserComponent } from './../Users/users.component';
import { LoginComponent } from './../Login/login.component';
import { WelcomeComponent } from './../Welcome/welcome.component';
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from '../routes/app.routes';
import { StoreModule } from "@ngrx/store";
import { SortPipe } from './../Pipes/sort.pipe';
import { EditUserComponent } from '../Users/edituser.component'
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { compose, applyMiddleware, createStore, Store } from 'redux'
import { DefaultComponent } from '../default/default.component';
import { autoRehydrate, persistStore } from 'redux-persist'
import { } from 'redux-devtools-extension'
function logger({ getState }) {
  return next => action => {
    let returnValue = next(action)
    return returnValue
  }
}

const middleware = [createLogger(), logger];
const composeEnhancers = compose;
// const composeEnhancdsers = window.devtoo|| compose;

// const store: Store<State> = createStore(
//   mainReducer,
//   intitialState,
//   composeEnhancers(
//     applyMiddleware(...middleware, logger, createLogger(), autoRehydrate)
//   )
// );


const store: Store<State> = compose(applyMiddleware(...middleware, logger, createLogger()))(createStore)(mainReducer);

// export const store: Store<{}> = compose(createLogger(), autoRehydrate())(createStore)(mainReducer);
persistStore(store);

// export const store: Store<State> = createStore(
//   mainReducer,
//   applyMiddleware(createLogger(), logger)
// );

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    UserComponent,
    SortPipe,
    OnFocusDirective,
    CreateUserComponent,
    EditUserComponent,
    DefaultComponent,
    GoogleSigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing,
    NgReduxModule,
    StoreModule.provideStore({ mainReducer })
  ],
  bootstrap: [AppComponent],
  providers: [UserService, AuthGuard]
})

export class AppModule {
  constructor(ngRedux: NgRedux<State>) {
    ngRedux.provideStore(store);
    //ngRedux.configureStore(mainReducer, intitialState, middleware);
  }
}
