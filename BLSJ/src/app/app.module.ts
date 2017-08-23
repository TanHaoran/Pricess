import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from '@angular/http';
import { MyApp } from './app.component';
import { DoAuditPage } from '../pages/event-audit/do-audit/do-audit';
import { MyComonentComponent } from '../components/my-comonent/my-comonent';
import { AuditListComponent } from '../components/audit-list/audit-list';

import { EventReportService } from '../providers/eventReportService';
import { AuditService } from '../providers/auditService';
import { LoadEventDataService } from '../providers/loadEventDataService';
import { CommonService } from '../providers/common/CommonService';
import { CommonCheck } from '../providers/common/CommonCheck';
import { HomeService } from '../providers/home/HomeService';
import { Util } from '../providers/common/util';
import { Localstorage } from '../providers/common/LocalStorage';
import {FileUploadComponentModule} from "../components/file-upload/file-upload.module";
import {IonTextToggleComponentModule} from "../components/ion-text-toggle/ion-text-toggle.module";


@NgModule({
  declarations: [
    MyApp,
    DoAuditPage,
    MyComonentComponent,
    AuditListComponent,
    AuditListComponent,
  ],
  imports: [
    IonTextToggleComponentModule,
    FileUploadComponentModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
            backButtonText: '',
            backButtonIcon: "md-arrow-back",
            iconMode: 'ios',
            mode: 'ios',
        })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DoAuditPage,
    DoAuditPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EventReportService,
    AuditService,
    HomeService,
    CommonService,
    CommonCheck,
    HomeService,
    Util,
    Localstorage,
    LoadEventDataService,
    AuditService,
    Util,
    CommonCheck,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
