This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Install Dependencies
- Install [Docker](https://docs.docker.com/desktop/)
- Install [VSCode](https://code.visualstudio.com/)
- Install [Eslint VSCode Plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (recommended)
- Install [Node.js](https://nodejs.org/en/download)
- Install [pnpm](https://pnpm.io/installation)
- Install a database viewer (we recommend [Postico 2](https://eggerapps.at/postico2/) for Mac users)

### 2. Setting up the environment

1. Open the project on VSCode and open a terminal. In the root `/curri-interview-template` directory, run: 
```sh
pnpm i
```
2. Generate Prisma by running the `db:generate` task or by running:
```sh
   pnpm nx generate-types curri-db
   ```
3. Make sure Docker is running
4. Run the `docker:up` VSCode task (`Ctrl/Cmd + Shift + P` --> "Tasks: Run Task" --> `docker:up`) or use the following command:
```sh
pnpm run docker-compose:services:up
```
5. Open Postico 2 (or whichever database viewer you are using) and create a new connection with the following info:

![image](https://github.com/teamcurri/curri-interview-template/assets/65439764/5777b068-52f8-4e3a-8cc7-753158c86f8d)

6. Migrate curri-db:
```sh
pnpm nx db:migrate curri-db
```
Refresh your database viewer. You should see a few tables in your database.

7. Seed curri-db with a user by running the `seed` VSCode task or using this command: 
```sh
pnpm nx db:seed-user curri-db
```
8. Run the `boot` VSCode task
9. In your browser, go to [http://localhost:4200](http://localhost:4200). You should see the Curri Playground.
10. You've set up your environment! To run it again, use the `boot` task.  
 
### Making Changes to the Database Schema
To make changes to existing tables and add new ones:
1. Open `packages/curri-db/schema.prisma` and make schema changes. ([Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) extension recommended)
2. Run the following to format the file:
```sh
pnpm npx prisma format
``` 
3. In a terminal at the root level, run the following:
```sh
pnpm npx prisma migrate dev
```
4. You will be asked to name the migration. Enter a name.
5. Prisma will autogenerate a migration file and run it. Refresh your database connection to see your changes. 
6. Regenerate types by running the `db:generate` task.

## Helpful Files and Commands
### Important Files
Below is a list of files/directories you will likely work with to develop your solution. This list is not exhaustive nor are you limited to these files.
- Frontend:
  - Curri Playground Book Delivery page: `apps/curri-playground/app/page.tsx`
  - User Settings Modal: `apps/curri-playground/app/components/UserSettingsModal.tsx`
- API:
  - Endpoints: `apps/curri-playground/app/api/graphql/route.ts`
  - Schema: `apps/curri-playground/app/graphql/schema.graphql`
- Backend:
  - Models: `packages/curri-db/src/models`
  - Database schema: `packages/curri-db/schema.prisma`
 
### VSCode Tasks (`tasks.json`):
- `boot`: spins up Docker containers, launches app, generates types, and watches for changes
- `app`: launches the app
- `db:generate`: generates curri-db types
- `docker:up` / `docker:down`: spins up/down Docker services
- `seed`: seeds the `users` table with a user
- `watch:graphql`: watches for changes and regenerates graphql types accordingly

### curri-db Commands: 
`pnpm nx [command] curri-db`

- `db:migrate`: initializes database schema
- `db:seed-user`: seeds a user into the `users` table
- `db:refresh`: reinitializes database
- `generate-types`: generates curri-db types
- `build`: builds curri-db package

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
