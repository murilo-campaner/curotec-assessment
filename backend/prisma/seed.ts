import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.post.deleteMany();

  // Create sample posts with fun content
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: 'Breaking News: New Senior Engineer Joins Curotec Team!',
        content: 'We are thrilled to announce that Murilo Campaner has joined our engineering team as a Senior Product Engineer! With his expertise in full-stack development, TypeScript, and modern web technologies, Murilo brings a fresh perspective and innovative approach to our product development process. Welcome aboard, Murilo! 🚀',
        published: true,
      },
    }),
    prisma.post.create({
      data: {
        title: 'React 18: The Future of Frontend Development',
        content: 'React 18 introduces groundbreaking features like Concurrent Features, Automatic Batching, and Suspense for Server Components. These improvements enable developers to build more responsive and performant applications. The new concurrent rendering model allows React to interrupt and resume work, making the user experience much smoother.',
        published: true,
      },
    }),
    prisma.post.create({
      data: {
        title: 'TypeScript Best Practices for Enterprise Applications',
        content: 'TypeScript has become the standard for building large-scale JavaScript applications. This post covers essential best practices including strict type checking, proper interface design, and advanced type manipulation techniques that help teams write more maintainable and bug-free code.',
        published: true,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Building Scalable APIs with Node.js, Express, and Prisma',
        content: 'Modern API development requires robust tools and best practices. This comprehensive guide explores how to build scalable REST APIs using Node.js, Express, and Prisma ORM. We cover authentication, validation, error handling, and deployment strategies for production environments.',
        published: false,
      },
    }),
    prisma.post.create({
      data: {
        title: 'PostgreSQL Performance Optimization Techniques',
        content: 'PostgreSQL is one of the most powerful open-source relational databases available. This article dives deep into performance optimization techniques including query optimization, indexing strategies, and configuration tuning to help you get the most out of your database.',
        published: true,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Docker for Modern Development Workflows',
        content: 'Docker has revolutionized how we develop, test, and deploy applications. Learn how to create consistent development environments, optimize container images, and implement effective CI/CD pipelines using Docker and container orchestration tools.',
        published: false,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Comprehensive Testing Strategies with Jest',
        content: 'Quality assurance is crucial for any software project. Jest provides a powerful testing framework for JavaScript applications. This guide covers unit testing, integration testing, mocking strategies, and best practices for maintaining high test coverage.',
        published: true,
      },
    }),
    prisma.post.create({
      data: {
        title: 'REST API Design Principles and Best Practices',
        content: 'Well-designed APIs are the foundation of modern software architecture. This post explores REST principles, HTTP status codes, authentication methods, and design patterns that help create APIs that are intuitive, secure, and maintainable.',
        published: true,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Frontend Performance Optimization: A Complete Guide',
        content: 'User experience is directly tied to application performance. This comprehensive guide covers techniques for optimizing frontend applications including code splitting, lazy loading, image optimization, and monitoring Core Web Vitals to ensure fast, responsive user interfaces.',
        published: false,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Murilo\'s First Day: Setting Up the Development Environment',
        content: 'Today was Murilo\'s first day at Curotec! We spent the morning setting up his development environment with all the latest tools and technologies. From configuring TypeScript and ESLint to setting up the PostgreSQL database with Prisma, everything is ready for productive development. The team is excited to see what innovative solutions Murilo will bring to our projects! 💻✨',
        published: true,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Product Engineering: Bridging Technical Excellence and User Value',
        content: 'Product Engineering goes beyond traditional software development by focusing on creating solutions that deliver real value to users and drive business growth. This approach combines technical expertise with product thinking, ensuring that every technical decision contributes to user satisfaction and business success.',
        published: true,
      },
    }),
    prisma.post.create({
      data: {
        title: 'Team Lunch: Getting to Know Our New Engineer',
        content: 'Had a fantastic team lunch today to welcome Murilo to the Curotec family! Great conversations about technology trends, upcoming projects, and of course, the best coffee shops in the area. The team is already impressed with Murilo\'s technical knowledge and collaborative spirit. Looking forward to building amazing products together! 🍕☕',
        published: false,
      },
    }),
  ]);

  console.log(`✅ Seed completed! ${posts.length} posts created.`);

  // Display created posts
  console.log('\n📝 Posts created:');
  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title} ${post.published ? '(Published)' : '(Draft)'}`);
  });

  console.log('\n🎉 Database is ready for production!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
