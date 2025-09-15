import { PrismaClient } from "../../../generated/prisma"


const prisma=new PrismaClient()
export default prisma
//export const prismaAdmin=new PrismaClient({datasources:{db:{url:process.env.DATABASE_URL_ADMIN}}})