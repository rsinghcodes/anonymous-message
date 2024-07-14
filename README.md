## Anonymous message 💌
Send and receive message anonymously 📲

Visit - [_**Site is live**_](https://pinganonymous.netlify.app/) ✨📡

### 🛠 Tech Stack
[![Next JS](https://img.shields.io/badge/Next-333333?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Postgres](https://img.shields.io/badge/postgres-333333.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-333333?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![NodeJS](https://img.shields.io/badge/node.js-333333?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![NPM](https://img.shields.io/badge/NPM-333333.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-333333.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/shadcn%2Fui-333333?style=for-the-badge&logo=shadcnui&logoColor=fff)](https://ui.shadcn.com/)
[![Docker](https://img.shields.io/badge/docker-333333.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

### 🏞 Screenshots
*Home page*

![Homepage](https://github.com/rsinghcodes/anonymous-message/assets/67682451/1b41ada8-0fbb-4f2d-adeb-11c2f945b112)

*Sign in*

![Sign in page](https://github.com/rsinghcodes/anonymous-message/assets/67682451/13b86a32-ff26-4ffe-99a2-6871d49b727a)

*Dashboard*

![Dashboard](https://github.com/rsinghcodes/anonymous-message/assets/67682451/005fef40-53bd-498f-9588-63ec43608231)


### 🛣 Getting Started

Create and add below variables in `.env`

```bash
USER_EMAIL=...
USER_PASSWORD=...
NEXTAUTH_SECRET=...
POSTGRES_DB=...
POSTGRES_PASSWORD=...
POSTGRES_USER=...
PGADMIN_DEFAULT_EMAIL=...
PGADMIN_DEFAULT_PASSWORD=...
NEXTAUTH_URL=...
DATABASE_URL=postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB?schema=public
```

*Using Node.js version: v20.14.0*

Run the development server:

```bash
npm install
```

```bash
npm run prisma:migrate
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)🚀 with your browser to see the result.
