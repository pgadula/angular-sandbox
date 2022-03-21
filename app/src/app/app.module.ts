import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { PlayersEffects } from './store/effects/players.effects';
import { MaterialModule } from './material/material.module';
import { OnlineEffects } from './store/effects/online.effects';
import { LetModule, PushModule } from '@rx-angular/template';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { Child3Component } from './child3/child3.component';
import { Child4Component } from './child4/child4.component';
import { HighlightDirective } from './highlight.directive';
import { ComponentNameDirective } from './component-name.directive';
import { Child5Component } from './child5/child5.component';
import { Child6Component } from './child6/child6.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationComponentDirective } from './application-component.directive';
@NgModule({
  declarations: [
    AppComponent,
    Child1Component,
    Child2Component,
    Child3Component,
    Child4Component,
    HighlightDirective,
    ComponentNameDirective,
    Child5Component,
    Child6Component,
    ApplicationComponentDirective,
  ],
  imports: [
    LetModule,
    PushModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([PlayersEffects, OnlineEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
