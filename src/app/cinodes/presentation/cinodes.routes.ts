import { Routes } from '@angular/router';

const repositoryManifestForm = () =>
  import('./views/repository-manifest-form/repository-manifest-form').then(
    (m) => m.RepositoryManifestForm,
  );

/**
 * Child routes of the cinodes bounded context, mounted under /repositories.
 *
 * @summary CI nodes routes.
 * @author Kiara Tuesta
 */
export const repositoriesRoutes: Routes = [
  {
    path: 'manifests/new',
    loadComponent: repositoryManifestForm,
    title: 'GitHub CI/CD Node & Repository Management Platform - New Repository Manifest',
  },
];
