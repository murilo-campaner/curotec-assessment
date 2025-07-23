# Assessment - Curotec
Este arquivo lista todas as tasks necessárias para implementar o projeto full-stack (Node.js + React + TS + PostgreSQL) com base nos requisitos da Curotec.

---

## **Contexto Geral**
- **Stack:** Node.js 20, React 18, TypeScript 5, PostgreSQL 15.
- **Pacotes obrigatórios:** Express 4, Prisma 5.
- **Critérios de avaliação:** Arquitetura, Data Management, Implementação e Documentação.
- **Funcionalidades principais:**
  1. CRUD completo para `Post` (id, title, content, published, createdAt, updatedAt).
  2. Busca otimizada com filtros, paginação e debounce no frontend.

**Bônus:** JWT Auth, WebSockets, Testes com Jest, caching avançado.

---

# **Tasks**

## **1. Setup do Projeto**
- [ ] Criar um **monorepo** com as pastas `backend/` e `frontend/`.
- [ ] Adicionar um **README.md** na raiz com visão geral.
- [ ] Criar `.env.example` com variáveis básicas (`DATABASE_URL`, `PORT`, etc.).
- [ ] Adicionar `docker-compose.yml` para PostgreSQL 15.

### **Prompt para o Cursor:**
