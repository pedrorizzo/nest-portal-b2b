declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_ENV: string;
      API_HOST: string;
      API_PORT: number;
      TZ: string;
      API_PASSWORD_SECRET: string;
      API_TOKEN_SECRET: string;
      DATABASE_DIALECT: string;
      DATABASE_HOST: string;
      DATABASE_PORT: number;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
    }
  }
}

export {};
