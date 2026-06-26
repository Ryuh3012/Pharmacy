import pkgPg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import pkgClient from '@prisma/client';
import { DATABASEURL } from '../config/confing.mjs';

const { Pool } = pkgPg;
const { PrismaClient } = pkgClient;

// Creamos la conexión nativa con la URL de tu .env
const pool = new Pool({ connectionString: DATABASEURL });
const adapter = new PrismaPg(pool);

// Instanciamos Prisma pasando el adaptador directo exigido por la v7
const prisma = new PrismaClient({ adapter });

export default prisma;