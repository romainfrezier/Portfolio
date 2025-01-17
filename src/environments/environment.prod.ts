export const environment: {
  production: boolean,
  EMAIL_PUBLIC_KEY: string,
  MINIO_ENDPOINT: string,
} = {
  production: true,
  EMAIL_PUBLIC_KEY: 'c-9qrNscXSzf8TmUb',
  MINIO_ENDPOINT: 'http://minio-portfolio:9000', // Using the internal network name to reduce latency
};
