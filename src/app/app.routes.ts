import { Routes } from '@angular/router';

const home = () => import('./cinodes/presentation/views/home/home').then((m) => m.Home);
const repositoriesRoutes = () =>
  import('./cinodes/presentation/cinodes.routes').then((m) => m.repositoriesRoutes);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'GitHub CI/CD Node & Repository Management Platform';

/**
 * Root route configuration. Bounded-context routes are composed as child routes.
 *
 * @summary Semantic routes of the application.
 * @author Kiara Tuesta
 */
export const routes: Routes = [
  { path: 'home', loadComponent: home, title: `${baseTitle} - Home` },
  { path: 'repositories', loadChildren: repositoriesRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];
