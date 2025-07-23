"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed do banco de dados...');
    await prisma.post.deleteMany();
    const posts = await Promise.all([
        prisma.post.create({
            data: {
                title: 'Introdução ao React 18',
                content: 'React 18 traz novas funcionalidades incríveis como Concurrent Features, Automatic Batching e Suspense para Server Components. Neste post, vamos explorar as principais mudanças e como elas melhoram a experiência do desenvolvedor.',
                published: true,
            },
        }),
        prisma.post.create({
            data: {
                title: 'TypeScript: Melhores Práticas',
                content: 'TypeScript é uma ferramenta poderosa que adiciona tipagem estática ao JavaScript. Vamos ver algumas melhores práticas para escrever código mais seguro e manutenível.',
                published: true,
            },
        }),
        prisma.post.create({
            data: {
                title: 'Node.js com Express e Prisma',
                content: 'Construir APIs robustas com Node.js, Express e Prisma é uma combinação poderosa. Vamos explorar como configurar um projeto full-stack moderno.',
                published: false,
            },
        }),
        prisma.post.create({
            data: {
                title: 'PostgreSQL: Otimização de Performance',
                content: 'PostgreSQL é um dos bancos de dados mais robustos disponíveis. Neste artigo, vamos discutir técnicas de otimização para melhorar a performance das suas consultas.',
                published: true,
            },
        }),
        prisma.post.create({
            data: {
                title: 'Docker para Desenvolvedores',
                content: 'Docker revolucionou a forma como desenvolvemos e implantamos aplicações. Vamos aprender como usar containers para criar ambientes de desenvolvimento consistentes.',
                published: false,
            },
        }),
        prisma.post.create({
            data: {
                title: 'Testes Automatizados com Jest',
                content: 'Testes são fundamentais para garantir a qualidade do código. Jest é uma ferramenta poderosa para testes unitários e de integração em projetos JavaScript.',
                published: true,
            },
        }),
        prisma.post.create({
            data: {
                title: 'API REST: Princípios e Boas Práticas',
                content: 'APIs REST são a base da comunicação entre sistemas modernos. Vamos explorar os princípios REST e como implementar boas práticas em suas APIs.',
                published: true,
            },
        }),
        prisma.post.create({
            data: {
                title: 'Frontend Performance: Técnicas de Otimização',
                content: 'Performance é crucial para a experiência do usuário. Vamos ver técnicas para otimizar aplicações frontend e melhorar os tempos de carregamento.',
                published: false,
            },
        }),
    ]);
    console.log(`✅ Seed concluído! ${posts.length} posts criados.`);
    console.log('\n📝 Posts criados:');
    posts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title} ${post.published ? '(Publicado)' : '(Rascunho)'}`);
    });
}
main()
    .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map