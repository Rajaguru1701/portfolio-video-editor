import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Nallamuthu M (Sabu) // Creative Portfolio — Video Editing & Brand Design'
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then(m => m.PortfolioComponent),
    title: 'Portfolio & Projects // Nallamuthu M (Sabu)'
  },
  {
    path: 'portfolio/:id',
    loadComponent: () => import('./pages/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About // Nallamuthu M (Sabu)'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact // Nallamuthu M (Sabu)'
  },
  {
    path: 'content-helper',
    loadComponent: () => import('./pages/content-helper/content-helper.component').then(m => m.ContentHelperComponent),
    title: 'Developer Content Helper // Sabu Portfolio'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 - Page Not Found // Sabu Portfolio'
  }
];
