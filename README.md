## setting up prisma

1. `npm install prisma --save-dev`
2. `npx prisma init` (This creates a new prisma directory with a schema.prisma file and configures PostgreSQL as your database.)
3. Modify schema.prisma file to include your models
4. `npx prisma db push` (syncs the schema with the database)
5. The above command `ran prisma generate` under the hood (which installed the @prisma/client package and generated a tailored Prisma Client API based on your models).

## seeding database

1. `npm run prisma-seed`

## view database using prisma studio

1. `npx prisma studio`

## prevent hot reloading from creating too many db connections

1. See `src/lib/prisma.ts`

## deployment on vercel

- `postinstall: prisma generate` in package.json is needed for Vercel deployment
