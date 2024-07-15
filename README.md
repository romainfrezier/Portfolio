# Portfolio

![](coverage-badge.svg)
![](test-badge.svg)
<img src="https://img.shields.io/badge/sonar-failed-red" alt="SonarQube">

## Table of Contents

<!-- TOC -->
* [Portfolio](#portfolio)
  * [Table of Contents](#table-of-contents)
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
    * [Testing](#testing)
    * [SonarQube](#sonarqube)
  * [Technologies](#technologies)
<!-- TOC -->

## Description

This is a portfolio website that showcases my work and provides a way to contact me.

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Usage

To run the application, use the following command:

```bash
npm start
```

The application will be running on `http://localhost:4200`.

### Testing

To run tests, use the following command:

```bash
npm test
```

or to run tests with coverage, use the following command:

```bash
npm run test:coverage
```

### SonarQube

To launch sonarqube, use the following command:

```bash
docker-compose -f docker-compose.sonar.yml up -d
```

The application will be running on `http://localhost:9000`.

Create a `.env` file with the following content:

```bash
SONAR_TOKEN=your_token
```

Replace `your_token` with your sonarqube token created from the `Security` tab in the `User` settings

Then scan the project using the following command:

```bash
./sonar.sh
```

## Technologies

<div>
    <img src="https://img.shields.io/badge/Angular-red?logo=angular" alt="Angular">
    <img src="https://img.shields.io/badge/Jest-green?logo=jest" alt="Jest">
    <img src="https://img.shields.io/badge/SonarQube-blue?logo=sonarqube" alt="SonarQube">
    <img src="https://img.shields.io/badge/Firebase-yellow?logo=firebase" alt="Firebase">
    <img src="https://img.shields.io/badge/GitHub%20Actions-black?logo=github" alt="GitHub Actions">
</div>

---

© Romain Frezier - 2024
