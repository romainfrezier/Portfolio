// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: {
  production: boolean,
  EMAIL_PUBLIC_KEY: string,
  MINIO_ENDPOINT: string,
} = {
  production: false,
  EMAIL_PUBLIC_KEY: 'c-9qrNscXSzf8TmUb',
  MINIO_ENDPOINT: 'https://api.minio.romainfrezier.com',
};

