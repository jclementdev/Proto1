import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InitializeDropdown } from './semanticDropdown'
import { GtiDataGrid } from './gtiDataGrid'
import { GtiDateTimePicker } from './gtiDateTimePicker'
import { GtiTextInput } from './gtiTextInput'

@NgModule({
    imports: [BrowserModule, HttpModule, JsonpModule, FormsModule],
    declarations: [AppComponent, InitializeDropdown, GtiDataGrid, GtiDateTimePicker, GtiTextInput],
    bootstrap: [AppComponent]
})
export class AppModule { }
