<h1 style="text-align: center;">Portfolio</h1>
<div style="text-align: center;">
  <img src="documentation/badges/coverage-badge.svg" alt="Coverage"/>
  <img src="documentation/badges/test-badge.svg" alt="Test"/>
  <img src="documentation/badges/sonar-badge.svg" alt="Sonar"/>
</div>
<h2 style="text-align: center;">Technologies</h2>
<div style="text-align: center;">
  <img src="https://img.shields.io/badge/Angular-v18-red?logo=angular&labelColor=red" alt="Angular"/>
  <img src="https://img.shields.io/badge/Jest-v29-green?logo=jest&labelColor=green" alt="Jest"/>
  <img src="https://img.shields.io/badge/SonarQube-v10-blue?logo=sonarqube&labelColor=blue" alt="SonarQube"/>
  <img src="https://img.shields.io/badge/Firebase%20Hosting-v10-yellow?logo=firebase&labelColor=yellow" alt="Firebase"/>
  <img src="https://img.shields.io/badge/GitHub%20Actions-v4-black?logo=github&labelColor=black" alt="GitHub Actions"/>
</div>

---

<div style="text-align: center;">
  <a href="#description">Description</a> •
  <a href="#license">License</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a>
</div>

---

## Table of Contents

<!-- TOC -->
  * [Table of Contents](#table-of-contents)
  * [Description](#description)
    * [Features](#features)
    * [Purpose](#purpose)
    * [How It Works](#how-it-works)
  * [License](#license)
  * [Installation](#installation)
  * [Usage](#usage)
    * [Launch app](#launch-app)
    * [Testing](#testing)
    * [SonarQube](#sonarqube)
<!-- TOC -->

## Description

This portfolio website showcases my work, skills, and projects, serving as a professional hub for potential employers, collaborators, and clients.

### Features

- Project Gallery: Displays selected projects with descriptions, technologies used, and links to demos and source code.
- Responsive Design: Ensures a seamless experience on all devices.
- Contact Form: Allows visitors to contact me directly.
- Technology Stack: Highlights the tools and technologies I use with badges and version info.

### Purpose

The portfolio aims to:

- Showcase Skills and Experience: Provides a comprehensive view of my capabilities through detailed project presentations.
- Facilitate Networking: Encourages connections and opportunities with an easy-to-use contact form.
- Share Knowledge: Includes a blog section for sharing insights and tutorials.

### How It Works

Built with modern web technologies for performance and maintainability:

- Frontend: Developed with Angular for a dynamic user interface.
- Testing: Uses Jest for reliable and high-quality code.
- Code Quality: SonarQube integration to maintain code standards.
- Hosting: Deployed on Firebase Hosting.
- CI/CD: Utilizes GitHub Actions for continuous integration and deployment.

This portfolio is a dynamic platform that effectively showcases my professional journey and technical expertise.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Installation

**Prerequisites**

- `nvm`
- `yarn`

First, use the correct version of node (version 22) :

```bash
nvm use
```

To install the necessary dependencies, run the following command:

```bash
yarn
```

## Usage

### Launch app

To run the application, use the following command:

```bash
yarn start
```

The application will be running on `http://localhost:4200`.

### Testing

To run tests, use the following command:

```bash
yarn run test
```

or to run tests with coverage, use the following command:

```bash
yarn run test:coverage
```

### SonarQube

**Prerequisites**

- `docker`
- `docker-compose`

To launch sonarqube, use the following command:

```bash
docker-compose -f docker-compose.sonar.yml up -d
```

The application will be running on `http://localhost:9000`.

Create a `.env` file with the same content as `.env.example` file and replace `your_token` with your sonarqube token created from the `Security` tab in the `User` settings

Then scan the project using the following command:

```bash
./sonar.sh
```

This will scan the project and update the quality gate badge.

---

© Romain Frezier - 2024
