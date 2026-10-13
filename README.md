# GitHub CI/CD Node & Repository Management Platform

## Description
Web application to monitor disk usage of regional CI/CD processing nodes and to register open source
repositories (provided in real time by the GitHub REST API) into those nodes.

## Features
- Toolbar with the GitHub logo, the platform title and an **EN / ES** language switcher (English by default).
- Sidenav (Angular Material) with the options **Home** and **New Repository Manifest**.
- **Home** (`/home`): "My CI Nodes" grid with one *CI Node Summary* card per node: hosted repositories,
  Total Allocated Storage, Available Capacity and Utilization Status (Normal < 75 %, Warning 75 %-99 %, Critical 100 %).
- **New Repository Manifest** (`/repositories/manifests/new`): reactive form with cross validation
  ("Allocated size exceeds available CI node capacity"); `registeredAt` and `id` are generated automatically.
- **Page not found** view for unsupported routes, showing the requested path.
- Responsive layout, dark GitHub-like theme and ARIA attributes.

## Stack
Angular 22 (standalone components, Signals), TypeScript, Angular Material, Angular Router, HttpClient,
`@ngx-translate/core` + `@ngx-translate/http-loader`, json-server 0.17.4.

## Architecture
Domain-driven, layered and component-based. Bounded contexts under `src/app`: `shared`, `cinodes`, `topics`,
each with `domain`, `application`, `infrastructure` and `presentation` (`views` / `components`).
Design patterns: Request/Response, Resource, Assembler, Api, Endpoint and Store.

## Setup
```bash
npm install
npm i -g json-server@0.17.4
cd server
json-server --watch db.json      # fake API at http://localhost:3000
```
In another terminal, from the project root:
```bash
npm start                        # http://localhost:4200
```
URLs are configured in `src/environments/`.

## Authorship
- **Author:** Nombre Apellido (student code: u202500000)
- **Repository:** https://github.com/usuario/ea7729u202500000
