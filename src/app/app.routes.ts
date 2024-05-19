import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';

import { DashboardComponent } from './pages/dashboard.component';
//import { ViewProfileComponent } from './app.component';
import { ViewProfileComponent } from './pages/view-profile.component';
import { NgModule } from '@angular/core';
import { EditProfileComponent } from './pages/edit-profile.component';
import { ViewDocumentsComponent } from './pages/view-documents.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './pages/change-password.component';


export const routes: Routes = [
    {
    path: '',redirectTo:'login' ,pathMatch:'full'//default to login    
},
{
    path:'login',
    component:LoginComponent
},
{
    path:'dashboard',
    component:DashboardComponent,canActivate: [AuthGuard]
},
{
    path: 'view-profile',
     component:ViewProfileComponent,canActivate: [AuthGuard]
},
{
    path: 'edit-profile/:id',
     component:EditProfileComponent,canActivate: [AuthGuard]
},

{
    path: 'view-documents/:id',
     component:ViewDocumentsComponent,canActivate: [AuthGuard]
},
{
    path: 'change-password',
     component:ChangePasswordComponent
},





// {//after login this is children component  and will be registered
//   path:'',
//     component:LayoutComponent,
//     children:[
        
       
//     ]
// }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}