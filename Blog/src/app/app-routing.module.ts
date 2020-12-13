import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './client/index/index.component';
import {PostComponent} from './client/post/post.component';
import {ArchiveComponent} from './client/archive/archive.component';
import {AboutUsComponent} from './client/about-us/about-us.component';
import {ContactUsComponent} from './client/contact-us/contact-us.component';
import {LoginComponent} from './client/login/login.component';
import {Error404Component} from './error404/error404.component';
import {CreateComponent} from './admin/create/create.component';
import {AdminindexComponent} from './admin/adminindex/adminindex.component';
import {AuthGuard} from './guards/auth.guard';
import {UpdateComponent} from './admin/update/update.component';
import {AddComponent} from './admin/add/add.component';
import {ProfileComponent} from './admin/profile/profile.component';
import {AdminpostComponent} from './admin/adminpost/adminpost.component';
import {RegisterComponent} from './client/register/register.component';


const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'archive', component: ArchiveComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'admin/post/:id', component: AdminpostComponent, canActivate: [AuthGuard]},
  {path: 'admin/add', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'admin/index', component: AdminindexComponent, canActivate: [AuthGuard]},
  {path: 'admin/update/:id', component: UpdateComponent, canActivate: [AuthGuard]},
  {path: 'admin/add/user', component: AddComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
