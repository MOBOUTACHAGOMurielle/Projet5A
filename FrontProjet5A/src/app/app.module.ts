import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatSidenavModule} from '@angular/material/sidenav';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JeanComponent } from './jean/jean.component';
import { RouterModule } from '@angular/router';
import { ManteauComponent } from './manteau/manteau.component';
import { TeeShirtComponent } from './tee-shirt/tee-shirt.component';
import { AccessoiresComponent } from './accessoires/accessoires.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnteteComponent } from './entete/entete.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    JeanComponent,
    ManteauComponent,
    TeeShirtComponent,
    AccessoiresComponent,
    DashboardComponent,
    EnteteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: 'jean', component: JeanComponent },
      { path: 'manteau', component: ManteauComponent },
      { path: 'tee-shirt', component: TeeShirtComponent },
      { path: 'accessoires', component: AccessoiresComponent },
      { path: 'dasboard', component: DashboardComponent },
      { path: '', redirectTo: '/dasboard', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
