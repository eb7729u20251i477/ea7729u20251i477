# GitHub CI/CD Node & Repository Management Platform

## Description
Web application to monitor disk usage of regional CI/CD processing nodes and to register open source
repositories (provided in real time by the GitHub REST API) into those nodes.

## Features
- Toolbar with the GitHub logo, the platform title and an **EN / ES** language switcher (English by default).
- Sidenav (Angular Material) with the options **Home** and **New Repository Manifest**.
- **Home** (`/home`): "My CI Nodes" grid with one *CI Node Summary* card per node, showing the hosted
  repositories, Total Allocated Storage, Available Capacity and Utilization Status
  (Normal < 75 %, Warning 75 % - 99 %, Critical 100 %).
- **New Repository Manifest** (`/repositories/manifests/new`): reactive form that validates the allocated size
  against the available capacity of the selected node ("Allocated size exceeds available CI node capacity").
  The `id` and `registeredAt` fields are generated automatically.
- **Page not found** view for unsupported routes, showing the requested path and a button to return to Home.
- Dark GitHub-like theme and ARIA attributes.
## Stack
- Angular 22 (standalone components, Signals) and TypeScript
- Angular Material and Angular Router
- HttpClient
- `@ngx-translate/core` and `@ngx-translate/http-loader` (i18n)
- json-server 0.17.4 (fake API) and the GitHub REST API (external provider)
## Architecture
Domain-driven design with layered and component-based architecture. The bounded contexts live in `src/app`:
`shared`, `cinodes` and `topics`. Each one is organized in `domain`, `application`, `infrastructure` and
`presentation` (`views` and `components`).

Design patterns: Request/Response, Resource, Assembler, Api, Endpoint and Store.

## Configuration
1. Install the dependencies:
```bash
   npm install
```
2. Install json-server and start the fake API:
```bash
   npm i -g json-server@0.17.4
   cd server
   json-server --watch db.json
```
The API runs at `http://localhost:3000`.
3. In another terminal, from the project root, start the application:
```bash
   npm start
```
The application runs at `http://localhost:4200`.

The base URLs and endpoint paths are defined in `src/environments/`.

## Authorship
- **Author:** Kiara Tuesta
- **Student code:** u20251i477
- **Private repository:** https://github.com/eb7729u20251i477/ea7729u20251i477.git
