import {config} from "dotenv"
config();



export const MONGODB_URI = process.env.MONGODB_URI
export const port = process.env.PORT
export const cloud_name = process.env.CLOUD_NAME
export const api_key = process.env.API_KEY
export const api_secret = process.env.API_SECRET
export const jwtSecretKey = process.env.JWT_SECRET