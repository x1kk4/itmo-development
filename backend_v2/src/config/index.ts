export interface AppConfig {
  port: number;
  prefix: string;
  databaseUrl: string;
  jwt: {
    access_secret: string;
    access_expiration: string;
    refresh_secret: string;
    refresh_expiration: string;
  };
  minio: {
    endpoint: string;
    access_key: string;
    secret_key: string;
    ssl: boolean;
    bucket: string;
  };
}

export default (): AppConfig =>
  ({
    port: Number(process.env.PORT ?? 3000),
    prefix: process.env.PREFIX ?? '/api',
    databaseUrl: process.env.DATABASE_URL,
    jwt: {
      access_secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      access_expiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION ?? '1h',
      refresh_secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      refresh_expiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION ?? '14d',
    },
    minio: {
      endpoint: process.env.MINIO_ENDPOINT,
      access_key: process.env.MINIO_ACCESS_KEY,
      secret_key: process.env.MINIO_SECRET_KEY,
      ssl: Boolean(process.env.MINIO_USE_SSL ?? 1),
      bucket: process.env.MINIO_BUCKET_NAME,
    },
  }) satisfies AppConfig;
