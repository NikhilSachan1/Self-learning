import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '', // Default path
        redirectTo: 'home', // Redirect to 'home' or another route
        pathMatch: 'full', // Ensures exact match for the empty path
      },
      {
        path: 'home', // Example route
        component: AppComponent,
      },
      {
        path: '**', // Wildcard route for 404 (not found)
        redirectTo: 'home', // Redirect to 'home' or another fallback route
      },
    
];
