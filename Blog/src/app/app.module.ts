import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IndexComponent} from './client/index/index.component';
import {PostComponent} from './client/post/post.component';
import {ArchiveComponent} from './client/archive/archive.component';
import {AboutUsComponent} from './client/about-us/about-us.component';
import {ContactUsComponent} from './client/contact-us/contact-us.component';
import {LoginComponent} from './client/login/login.component';
import {Error404Component} from './error404/error404.component';
import {HttpClientModule} from '@angular/common/http';
import {CreateComponent} from './admin/create/create.component';
import {AuthGuard} from './guards/auth.guard';
import {ClientFooterComponent} from './client/footer/footer.component';
import {AdminFooterComponent} from './admin/footer/footer.component';
import {AdminHeaderComponent} from './admin/header/header.component';
import {ClientHeaderComponent} from './client/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminindexComponent} from './admin/adminindex/adminindex.component';
import {HashLocationStrategy} from '@angular/common';
import { ProfileComponent } from './admin/profile/profile.component';
import { UpdateComponent } from './admin/update/update.component';
import { AddComponent } from './admin/add/add.component';
import { AdminpostComponent } from './admin/adminpost/adminpost.component';
import { RegisterComponent } from './client/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ClientFooterComponent,
    ClientHeaderComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    PostComponent,
    ArchiveComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    Error404Component,
    CreateComponent,
    AdminindexComponent,
    ProfileComponent,
    UpdateComponent,
    AddComponent,
    AdminpostComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    HashLocationStrategy,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
