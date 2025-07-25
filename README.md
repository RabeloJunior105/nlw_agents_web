# Agent IA - Frontend (Web)

Este é o frontend do Agent IA, um sistema de perguntas e respostas com inteligência artificial, desenvolvido em React + TypeScript + Vite.

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Lucide Icons](https://lucide.dev/)

## Instalação

```sh
npm install
```

## Desenvolvimento

```sh
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Build de produção

```sh
npm run build
```

## Estrutura

- `src/components`: Componentes reutilizáveis
- `src/pages`: Páginas principais
- `src/http`: Hooks para requisições à API
- `src/lib`: Utilitários e libs auxiliares

## Configuração

O frontend espera que o backend esteja rodando em `http://localhost:3000`. Para alterar, edite as URLs nos hooks de `src/http/`.

---
