# TASKS.MD - Melhorias da Codebase

## 📋 Visão Geral
Este documento contém todas as tarefas identificadas para melhorar a codebase, organizadas por prioridade e fase de implementação.

## �� Objetivos
- Melhorar a manutenibilidade do código
- Aumentar a reutilização de componentes
- Otimizar performance e UX
- Padronizar internacionalização
- Implementar boas práticas de arquitetura

---

## 🔴 FASE 1: REFATORAÇÃO CRÍTICA (Alta Prioridade)

### 1.1 Backend - Internacionalização Completa
**Arquivo:** `backend/src/controllers/postController.ts`
**Descrição:** Converter todas as mensagens de erro e sucesso para inglês
**Detalhes:**
- Linha 45: "Post criado com sucesso" → "Post created successfully"
- Linha 58: "Post atualizado com sucesso" → "Post updated successfully"
- Linha 71: "Post deletado com sucesso" → "Post deleted successfully"
- Verificar se há outras mensagens em português

**Arquivo:** `backend/src/services/postService.ts`
**Descrição:** Converter todas as mensagens de erro para inglês
**Detalhes:**
- Linha 15: "Erro ao buscar posts" → "Error fetching posts"
- Linha 32: "Post não encontrado" → "Post not found"
- Linha 35: "Erro ao buscar post" → "Error fetching post"
- Linha 48: "Erro ao criar post" → "Error creating post"
- Linha 67: "Erro ao atualizar post" → "Error updating post"
- Linha 85: "Erro ao deletar post" → "Error deleting post"
- Linha 130: "Erro ao buscar posts" → "Error searching posts"
- Linha 145: "Erro ao contar posts publicados" → "Error counting published posts"
- Linha 155: "Erro ao contar rascunhos" → "Error counting drafts"

**Arquivo:** `backend/src/index.ts`
**Descrição:** Converter logs de console para inglês
**Detalhes:**
- Linha 47: "Rota não encontrada" → "Route not found"
- Linha 52: "Servidor rodando na porta" → "Server running on port"
- Linha 53: "Health check:" → "Health check:"
- Linha 54: "Posts API:" → "Posts API:"
- Linha 55: "Search API:" → "Search API:"
- Linha 56: "Stats API:" → "Stats API:"
- Linha 57: "API Base URL:" → "API Base URL:"
- Linha 58: "Iniciado em:" → "Started at:"

### 1.2 Frontend - Extrair Hooks Customizados
**Arquivo:** `frontend/src/hooks/usePosts.ts` (NOVO)
**Descrição:** Criar hook customizado para gerenciar posts
**Detalhes:**
- Extrair toda a lógica de posts do App.tsx
- Incluir: queries, mutations, filtros, paginação
- Retornar: posts, loading, error, handlers
- Manter estado local: searchQuery, currentPage, publishedFilter
- Implementar handlers: handleSearchChange, handlePageChange, handleFilterChange

**Arquivo:** `frontend/src/hooks/usePostMutations.ts` (NOVO)
**Descrição:** Criar hook para gerenciar mutations de posts
**Detalhes:**
- Extrair createMutation, updateMutation, deleteMutation
- Incluir handlers: handleCreate, handleUpdate, handleDelete
- Gerenciar loading states das mutations
- Retornar mutations e handlers

**Arquivo:** `frontend/src/hooks/usePostModal.ts` (NOVO)
**Descrição:** Criar hook para gerenciar estado do modal
**Detalhes:**
- Gerenciar: isModalOpen, editingPost
- Handlers: openModal, closeModal, setEditingPost
- Reset form quando modal fecha
- Retornar estado e handlers

### 1.3 Frontend - Refatorar App.tsx
**Arquivo:** `frontend/src/App.tsx`
**Descrição:** Simplificar componente principal usando hooks customizados
**Detalhes:**
- Importar hooks customizados criados
- Remover lógica duplicada
- Manter apenas renderização e composição
- Reduzir de ~176 linhas para ~80 linhas
- Manter estrutura de componentes

### 1.4 Frontend - Separar Modal em Componentes
**Arquivo:** `frontend/src/components/Modal.tsx`
**Descrição:** Converter para componente genérico
**Detalhes:**
- Remover lógica específica de posts
- Props genéricas: isOpen, onClose, title, children
- Manter apenas estrutura do modal
- Remover form logic

**Arquivo:** `frontend/src/components/PostForm.tsx` (NOVO)
**Descrição:** Criar componente específico para formulário de posts
**Detalhes:**
- Mover toda a lógica de formulário do Modal
- Props: post, onSubmit, isLoading
- Incluir validação de campos
- Manter estados: formData, handleChange, handleSubmit

**Arquivo:** `frontend/src/components/PostModal.tsx` (NOVO)
**Descrição:** Criar wrapper que combina Modal + PostForm
**Detalhes:**
- Usar Modal genérico
- Incluir PostForm como children
- Gerenciar título dinâmico (Edit/New)
- Props: isOpen, onClose, onSubmit, post, isLoading

### 1.5 Frontend - Criar Utilitários
**Arquivo:** `frontend/src/utils/filters.ts` (NOVO)
**Descrição:** Criar utilitário para filtros de posts
**Detalhes:**
- Função filterPosts(posts, searchQuery, publishedFilter)
- Lógica de busca por título e conteúdo
- Filtro por status de publicação
- Retornar posts filtrados

**Arquivo:** `frontend/src/utils/pagination.ts` (NOVO)
**Descrição:** Criar utilitário para paginação
**Detalhes:**
- Função paginatePosts(posts, page, itemsPerPage)
- Calcular: totalItems, totalPages, startIndex, endIndex
- Retornar posts paginados e metadados

---

## 🟡 FASE 2: MELHORIAS DE UX (Média Prioridade)

### 2.1 Frontend - Implementar Filtros Visuais
**Arquivo:** `frontend/src/components/FilterBar.tsx` (NOVO)
**Descrição:** Criar componente para filtros visuais
**Detalhes:**
- Filtro por status (All, Published, Drafts)
- Botões de toggle para cada filtro
- Estado visual ativo/inativo
- Integrar com usePosts hook

**Arquivo:** `frontend/src/App.tsx`
**Descrição:** Adicionar FilterBar ao layout
**Detalhes:**
- Posicionar entre SearchBar e PostList
- Conectar com handleFilterChange do hook
- Manter responsividade

### 2.2 Frontend - Melhorar Tratamento de Erros
**Arquivo:** `frontend/src/components/ErrorBoundary.tsx` (NOVO)
**Descrição:** Criar ErrorBoundary para capturar erros React
**Detalhes:**
- Capturar erros de renderização
- Mostrar fallback UI
- Log de erros para debugging
- Props: fallback, onError

**Arquivo:** `frontend/src/components/ErrorDisplay.tsx` (NOVO)
**Descrição:** Componente para exibir erros de forma amigável
**Detalhes:**
- Diferentes tipos de erro (network, validation, etc.)
- Botão de retry
- Mensagens amigáveis
- Props: error, onRetry

**Arquivo:** `frontend/src/components/ConfirmDialog.tsx` (NOVO)
**Descrição:** Substituir confirm() nativo por modal customizado
**Detalhes:**
- Modal de confirmação estilizado
- Props: isOpen, title, message, onConfirm, onCancel
- Integrar com delete post

### 2.3 Frontend - Adicionar Loading States
**Arquivo:** `frontend/src/components/LoadingSpinner.tsx` (NOVO)
**Descrição:** Componente de loading reutilizável
**Detalhes:**
- Spinner animado
- Props: size (sm, md, lg), color
- Integrar com TailwindCSS

**Arquivo:** `frontend/src/components/SkeletonLoader.tsx` (NOVO)
**Descrição:** Skeleton loading para posts
**Detalhes:**
- Placeholder animado para posts
- Props: count (número de skeletons)
- Usar no PostList durante loading

### 2.4 Frontend - Melhorar Feedback Visual
**Arquivo:** `frontend/src/components/Toast.tsx` (NOVO)
**Descrição:** Sistema de notificações toast
**Detalhes:**
- Diferentes tipos: success, error, warning, info
- Auto-dismiss
- Posicionamento configurável
- Props: type, message, duration

**Arquivo:** `frontend/src/hooks/useToast.ts` (NOVO)
**Descrição:** Hook para gerenciar toasts
**Detalhes:**
- showToast(type, message)
- hideToast(id)
- Gerenciar múltiplos toasts
- Retornar: showToast, hideToast, toasts

---

## 🟢 FASE 3: OTIMIZAÇÕES (Baixa Prioridade)

### 3.1 Backend - Middleware de Validação
**Arquivo:** `backend/src/middlewares/validation.ts` (NOVO)
**Descrição:** Middleware global para validação
**Detalhes:**
- Validação automática baseada em schemas Zod
- Middleware factory para diferentes schemas
- Tratamento de erros de validação
- Integrar com controllers

**Arquivo:** `backend/src/routes/posts.ts`
**Descrição:** Aplicar middleware de validação
**Detalhes:**
- Adicionar validação em todas as rotas
- Remover validação manual dos controllers
- Manter schemas existentes

### 3.2 Frontend - Otimizar React Query
**Arquivo:** `frontend/src/services/postsApi.ts`
**Descrição:** Melhorar configuração do React Query
**Detalhes:**
- Adicionar staleTime e cacheTime
- Implementar retry logic
- Melhorar query keys
- Adicionar optimistic updates

**Arquivo:** `frontend/src/App.tsx`
**Descrição:** Configurar QueryClient com opções otimizadas
**Detalhes:**
- defaultOptions para queries e mutations
- Retry configuration
- Cache configuration
- Error handling global

### 3.3 CSS - Design System
**Arquivo:** `frontend/src/index.css`
**Descrição:** Expandir classes utilitárias
**Detalhes:**
- Adicionar mais variantes de botões
- Criar classes para cards, inputs, modals
- Definir espaçamentos consistentes
- Adicionar animações

**Arquivo:** `frontend/src/components/ui/Button.tsx` (NOVO)
**Descrição:** Componente base para botões
**Detalhes:**
- Variantes: primary, secondary, danger, ghost
- Tamanhos: sm, md, lg
- Estados: loading, disabled
- Props: variant, size, loading, disabled, children

**Arquivo:** `frontend/src/components/ui/Input.tsx` (NOVO)
**Descrição:** Componente base para inputs
**Detalhes:**
- Tipos: text, textarea, checkbox
- Estados: error, disabled
- Validação visual
- Props: type, error, disabled, placeholder

### 3.4 TypeScript - Melhorar Tipos
**Arquivo:** `frontend/src/types/post.ts`
**Descrição:** Melhorar definições de tipos
**Detalhes:**
- Adicionar branded types para IDs
- Criar tipos mais específicos
- Adicionar validação de tipos
- Remover any types

**Arquivo:** `backend/src/types/post.ts`
**Descrição:** Melhorar schemas Zod
**Detalhes:**
- Adicionar mensagens de erro customizadas
- Melhorar validações
- Adicionar transformações
- Criar schemas reutilizáveis

---

## 🔧 FASE 4: TESTES E DOCUMENTAÇÃO

### 4.1 Frontend - Testes Unitários
**Arquivo:** `frontend/src/__tests__/hooks/usePosts.test.ts` (NOVO)
**Descrição:** Testes para hook usePosts
**Detalhes:**
- Testar filtros
- Testar paginação
- Testar handlers
- Mock React Query

**Arquivo:** `frontend/src/__tests__/components/PostForm.test.tsx` (NOVO)
**Descrição:** Testes para PostForm
**Detalhes:**
- Testar validação
- Testar submit
- Testar estados
- Mock props

### 4.2 Backend - Testes de Integração
**Arquivo:** `backend/src/__tests__/controllers/postController.test.ts` (NOVO)
**Descrição:** Testes para PostController
**Detalhes:**
- Testar todas as rotas
- Mock Prisma
- Testar validação
- Testar erros

### 4.3 Documentação
**Arquivo:** `docs/ARCHITECTURE.md` (NOVO)
**Descrição:** Documentar arquitetura do projeto
**Detalhes:**
- Estrutura de pastas
- Padrões utilizados
- Decisões de design
- Guias de contribuição

---

## 📊 Métricas de Sucesso

### Quantitativas:
- Reduzir App.tsx de 176 para <80 linhas
- Aumentar cobertura de testes para >80%
- Reduzir duplicação de código em 50%
- Melhorar performance (Lighthouse score >90)

### Qualitativas:
- Código mais legível e manutenível
- Componentes reutilizáveis
- Melhor experiência do usuário
- Arquitetura escalável

---

## �� Ordem de Implementação Recomendada

1. **Fase 1.1**: Internacionalização Backend
2. **Fase 1.2**: Hooks Customizados
3. **Fase 1.3**: Refatorar App.tsx
4. **Fase 1.4**: Separar Modal
5. **Fase 1.5**: Utilitários
6. **Fase 2.1**: Filtros Visuais
7. **Fase 2.2**: Tratamento de Erros
8. **Fase 2.3**: Loading States
9. **Fase 2.4**: Toast Notifications
10. **Fase 3.1**: Middleware Validação
11. **Fase 3.2**: Otimizar React Query
12. **Fase 3.3**: Design System
13. **Fase 3.4**: Melhorar Tipos
14. **Fase 4**: Testes e Documentação

---

## �� Notas de Implementação

- Manter compatibilidade com funcionalidades existentes
- Testar cada mudança antes de prosseguir
- Documentar breaking changes
- Seguir padrões de commit semântico
- Revisar código após cada fase

---

## ✅ Checklist de Conclusão

- [ ] Fase 1 completa
- [ ] Fase 2 completa
- [ ] Fase 3 completa
- [ ] Fase 4 completa
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Code review final
- [ ] Deploy em produção
