import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { EditorComponent } from './editor.component';

import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { EditorRoutingModule } from './editor-routing.module';

@NgModule({
  imports: [SharedModule, EditorRoutingModule, DialogModule],
  declarations: [EditorComponent],
  providers: []
})
export class EditorModule {}
