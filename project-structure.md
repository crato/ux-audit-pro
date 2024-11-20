ux-audit-pro/
├── .github/
│   └── workflows/
│       └── main.yml
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...auth0]/
│   │   │   │       └── route.ts
│   │   │   └── audits/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── sidebar.tsx
│   │   └── ui/
│   ├── lib/
│   │   ├── db.ts
│   │   └── utils.ts
│   ├── models/
│   │   └── audit.ts
│   └── types/
│       └── index.ts
├── public/
│   └── images/
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
