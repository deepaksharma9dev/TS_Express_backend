
# TS_Express_Backend

A TypeScript-based Node.js backend built with Express, PostgreSQL, Drizzle ORM, and JWT authentication.

## 🚀 Features

- User registration and login
- JWT-based authentication middleware
- PostgreSQL integration using Drizzle ORM
- Modular TypeScript project structure
- Environment variable configuration with dotenv

---

## 📁 Project Structure

```
TS_Express_backend/
│
├── src/
│   ├── controllers/
│   │   └── user.ts
│   ├── db/
│   │   └── connection.ts
|   |   └── schema.ts
│   ├── middlewares/
│   │   └── auth.ts
│   ├── routes/
│   │   └── user.ts
│   ├── types/
│   │   └── express.d.ts
|   ├──utils/
│   │   └── jwt.ts
|   |   
│   └── app.ts
│
├── dist/                 # Compiled JS output
├── .env                 # Your environment secrets (not committed)
├── .env.example         # Example environment file
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🛠 Tech Stack

- **Node.js**
- **Express 5**
- **TypeScript**
- **PostgreSQL**
- **Drizzle ORM**
- **JWT Authentication**
- **dotenv**
- **nodemon** (dev only)
- **ts-node** (dev only)

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/deepaksharma9dev/TS_Express_backend.git
cd TS_Express_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file using the `.env.example`:

**.env**
```
DATABASE_URL=postgres://username:password@localhost:5432/drizzledemo
JWT_SECRET=your-secret-key
```

### 4. Build the project

```bash
npm run build
```

### 5. Start in development

```bash
npm run dev
```

### 6. Start the compiled server

```bash
npm start
```

---

## 📦 NPM Scripts

| Script         | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Starts server with `nodemon`         |
| `npm run build`| Compiles TypeScript to `dist/`       |
| `npm start`    | Runs built app (`dist/app.js`)       |

---

## ✅ API Endpoints

### Public

- `POST /users` – Register a user  
- `POST /users/login` – Login user

### Protected (JWT Required)

- `GET /users/:id` – Get user info
- `PUT /users/:id` – Update user
- `DELETE /users/:id` – Delete user

**Authorization header format:**
```
Authorization: Bearer <your_token>
```

---

## 🧠 Auth Middleware

Token is validated via middleware:

```ts
req.headers.authorization = 'Bearer <token>';
```

Decoded payload contains:

```ts
{
  userId: string;
  role: string;
}
```

---

## 🔗 Database Connection

Using PostgreSQL with Drizzle ORM:

```ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'yourpassword',
  host: 'localhost',
  port: 5432,
  database: 'drizzledemo',
});

export const db = drizzle(pool, { schema });
```

---

## 📂 TypeScript Config

**tsconfig.json**
```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## 📄 .gitignore

```
node_modules/
.env
dist/
```

---

## 📎 Useful Links

- **Repo:** [TS_Express_backend](https://github.com/deepaksharma9dev/TS_Express_backend)
- **Issues:** [Report bugs](https://github.com/deepaksharma9dev/TS_Express_backend/issues)

---

## 👨‍💻 Author

**Deepak Sharma**  
GitHub: [@deepaksharma9dev](https://github.com/deepaksharma9dev)

---

## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC)
