# Todo List

## Stack

- Hono
- Zod
- SWR
- Cloudflare Pages
- Cloudflare D1

## Structure

```
├── common
│   └── types.ts
├── front
│   ├── App.tsx
│   ├── client.ts
│   ├── components
│   │   ├── AddTaskForm.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskList.tsx
│   └── main.tsx
├── functions
│   └── api
│       └── [[route]].ts
├── index.html
├── package.json
├── server
│   └── index.ts
├── todo.sql
├── tsconfig.json
├── vite.config.ts
├── wrangler.toml
└── yarn.lock
```

## Setup

Local development:

```
yarn wrangler d1 create todo --local
yarn wrangler d1 execute todo --local --file=./todo.sql
```

Production:

```
yarn wrangler d1 create todo
yarn wrangler d1 execute todo --file=./todo.sql
```

Copy and past `database_id` to `wrangler.toml`.

## License

MIT

Heavily inspired by

- [SWR2.0 を Todo リストをつくりながら試す](https://zenn.dev/hiromu617/articles/5464523aba473d)
- <https://github.com/hiromu617/swr_todo>

## Author

Yusuke Wada <https://github.com/yusukebe>
