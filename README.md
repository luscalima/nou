<p align="center" style="margin-top: 120px">
  <h3 align="center">nou</h3>
  <p align="center">
    API monitoring application
  </p>
</p>

## About **nou**

**nou** is an open-source monitoring platform designed to periodically provide insights into the health of websites and APIs. Utilize the nou UI to easily manage monitors, allowing you to observe your applications' uptime and receive timely notifications in the event of any failures.

<p style="margin-top: 30px">⚠️ This repo only contains de source code of the application's server-side</p>

## Table of contents

-   [About **nou**](#about-nou)
-   [Table of contents](#table-of-contents)
-   [Build with](#build-with)
-   [Features](#features)
-   [Get started](#get-started)
    -   [Requirements](#requirements)
    -   [Installation and usage](#installation-and-usage)
    -   [Architecture](#architecture)
    -   [Roadmap](#roadmap)
        -   [Version 0.1.0 (Upcoming release)](#version-010-upcoming-release)
        -   [Future plans](#future-plans)
-   [Contributing](#contributing)

## Build with

-   [Fastify](https://fastify.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Kysely](https://kysely.dev/)
-   [PostgreSQL](https://www.postgresql.org/)

## Features

-   Monitor managment

> ⚠️ Other features are being implemented. See the [roadmap](#roadmap).

## Get started

### Requirements

-   [Node](https://nodejs.org/en) (20.10.0 or later)
-   [pnpm](https://pnpm.io/) (8.6.3 or later)
-   [Docker](https://www.docker.com/)

### Installation and usage

1. Clone this repo

```sh
$ git clone git@github.com:luscalima/nou.git # ssh
```

2. Install the dependencies

```sh
$ pnpm install
```

3. Start the required services (database etc.)

```sh
$ docker compose up -d
```

4. Run the migrations

```sh
$ pnpm migrate:latest
```

5. Start the application

```sh
$ pnpm dev
```

### Architecture

This project implements a more simplified architecture in the MSC (Model, Service, Controller) format. The following bullets explain each of these layers in more non-technical detail:

-   The **model** layer is responsible for representing data and defining the business domain. The components that compose this layer are:
    -   Models. Classes that define the form and nature of data.
    -   Repositories. Abstractions that define the signature of methods that manipulate data defined by models.
    -   Providers: Concrete implementations of repositories with a specific technology.
-   The **service** layer is responsible for handling the business logic. The component that compose this layer is:
    -   Services. Classes that expose methods to manipulate rules and handle business errors.
-   The **controller** layer is responsible for handling API requests and resposes. The component that compose this layer is:
    -   Controllers. Classes that expose static methods that handle things related to the HTTP protocol and validate input data and parameters.

### Roadmap

#### Version 0.1.0 (Upcoming release)

-   [x] Monitor management:
    -   [x] CRUD operations.
-   [ ] Contact management:
    -   [ ] CRUD operations.
    -   [ ] Linking a contact to a monitor.
-   [ ] Monitoring
    -   [ ] Script to run cronjobs based on parameters.
    -   [ ] Service for cronjobs handling.
-   [ ] User interface:
    -   [ ] Monitor management.
    -   [ ] Contact management.
-   [ ] Alert for contacts:
    -   [ ] Email sending.

#### Future plans

-   Automation with CI/CD.
-   Community feedback.

## Contributing

1. Fork the repository
2. Create a new branch (feature branch method):

```sh
$ git checkout -b feature/new-feature
```

3. Make your changes and commit them.
4. Push to the branch:

```sh
$ git push origin feature/new-feature
```

5. Submit a pull request.
