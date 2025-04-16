import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CampaignCreateComponent } from './components/campaign-create/campaign-create.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: CampaignListComponent },
            { path: 'campaign/create', component: CampaignCreateComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '/login' }
];
