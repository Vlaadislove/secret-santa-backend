import { IClientInfo } from "./middlewares/middlewares";

export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      //DB and server
      DB_URL: string;
      PORT: number
      //Mail
      SMTP_PORT: number
      SMTP_HOST: string
      SMTP_USER: string
      SMTP_PASSWORD: string
      CLIENT_URL: string;
      //Cookie
      COOKIE_SECRET: string
      CLIENT_COOKIE: string

      JWT_ACCESS_SECRET:string
      JWT_REFRESH_SECRET:string
      JWT_EXPIRATION_REFRESH:string
      JWT_EXPIRATION_ACCESS:string
      JWT_AUDIENCE:string
      JWT_ISSUER:string
      JWT_SUBJECT:string
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      client: IClientInfo;
      // user: IAuthenticatedUser | undefined;
    }
  }
}