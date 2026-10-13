/**
 * Environment configuration (no hard-coded URLs or paths in the code base).
 *
 * @summary Base URLs and endpoint paths for the fake API (json-server) and the GitHub REST API.
 * @author Kiara Tuesta
 */
export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderCiNodesEndpointPath: '/ci-nodes',
  platformProviderRepositoryManifestsEndpointPath: '/repository-manifests',
  githubApiBaseUrl: 'https://api.github.com',
  githubSearchRepositoriesEndpointPath: '/search/repositories',
  githubLogoUrl: 'https://github.githubassets.com/favicons/favicon-dark.svg',
};
