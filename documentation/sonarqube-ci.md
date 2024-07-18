# SonarQube in CI

![SonarQube](https://img.shields.io/badge/SonarQube-v10-blue?logo=sonarqube)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-v3-black?logo=github)

**Prerequisites**

- `SonarQube` running on port `9000`
- `ngrok` account

## Table of Contents

<!-- TOC -->
* [SonarQube in CI](#sonarqube-in-ci)
  * [Table of Contents](#table-of-contents)
  * [Ngrok](#ngrok)
  * [GitHub Actions](#github-actions)
  * [Limitations](#limitations)
<!-- TOC -->

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

Add this section in the `ci.yml` workflow : 

```yaml
  sonarqube:
    runs-on: ubuntu-latest
    name: Sonar quality gate
    needs: tests
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.ref }}
          fetch-depth: 0
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22.4.0'
      - name: Install dependencies
        run: npm install && npm install -g badge-maker
      - name: Run tests to get coverage
        id: run_tests
        run: npm run test:coverage
      - name: SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@v2.3.0
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
      - name: Check Quality Gate
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
        run: |
          res_status=$(curl -s "${SONAR_HOST_URL}/api/qualitygates/project_status?projectKey=Portfolio" \
          -H "Accept: application/json" \
          -H "Authorization: Bearer ${SONAR_TOKEN}" | grep -o '"status":"[^"]*' | head -1 | cut -d':' -f2 | tr -d '"')
      - name: Generate Badge
        run: |
          if [ "$res_status" != "OK" ]; then
            echo "Quality Gate failed!"
            npx badge-maker "quality gate" "failed" "red" > documentation/badges/sonar-badge.svg
            exit 1
          else
            echo "Quality Gate passed!"
            npx badge-maker "quality gate" "passed" "green" > documentation/badges/sonar-badge.svg
          fi
      - name: Commit badge
        if: always()
        run: |
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git config --global user.name "github-actions[bot]"
          git add documentation/badges/sonar-badge.svg
          if ! git diff --cached --exit-code; then
            git commit -m "Add sonar badge"
            git push
          else
            echo "No changes to commit"
          fi
```

This will : 

- Set up the `sonarqube` job (node.js, dependencies...)
- Run tests to get the coverage folder
- Launch the sonar scanner
- Check the quality gate and create a badge consequently
- Commit the badge to the current branch

## Limitations

In the free version, ngrok limits the amount of bandwidth used each month. The limit is relatively low, reached in around 20 sonarqube tests, making it impossible to use ngrok on a stable basis.

