import dotenv from 'dotenv'
dotenv.config()

//DB and server

//Mail

//Cookie
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const CLIENT_COOKIE = process.env.CLIENT_COOKIE;


export const AUTH = {
    jwtExpirationAccess:process.env.JWT_EXPIRATION_ACCESS,
    jwtExpirationRefresh:process.env.JWT_EXPIRATION_REFRESH,
    jwtKeyAccess: process.env.JWT_ACCESS_SECRET,
    jwtKeyRefresh: process.env.JWT_REFRESH_SECRET,
    jwtAudience: process.env.JWT_AUDIENCE,
    jwtIssuer: process.env.JWT_ISSUER,
    jwtSubject: process.env.JWT_SUBJECT,
}
