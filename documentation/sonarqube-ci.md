# SonarQube in CI

![SonarQube](https://img.shields.io/badge/SonarQube-v10-blue?logo=sonarqube)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-v3-black?logo=github)

**Prerequisites**

- `SonarQube` running on port `9000`
- `ngrok` account

## Ngrok

Install `ngrok`:

```bash
brew install ngrok/ngrok/ngrok
```

Log into `ngrok` dashboard, and get the token from the setup section:

```bash
ngrok config add-authtoken <token>
```

Start `ngrok` tunnel

```bash
ngrok http --domain=<static-free-domain> 9000
```

## GitHub Actions

Add the following GitHub secrets:
1. `SONAR_TOKEN`: `<sonar token from .env>`
2. `SONAR_HOST`: `<static-free-domain>`
