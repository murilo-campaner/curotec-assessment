import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Curotec Posts API',
      version: '1.0.0',
      description: 'API para gerenciamento de posts com funcionalidades de CRUD, busca, filtros e paginação',
      contact: {
        name: 'Curotec Team',
        email: 'dev@curotec.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the post',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'Title of the post',
              example: 'Getting Started with React',
              maxLength: 255,
            },
            content: {
              type: 'string',
              description: 'Content of the post',
              example: 'React is a JavaScript library for building user interfaces...',
              maxLength: 10000,
            },
            published: {
              type: 'boolean',
              description: 'Whether the post is published',
              example: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
              example: '2024-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
              example: '2024-01-01T00:00:00.000Z',
            },
          },
          required: ['id', 'title', 'content', 'published', 'createdAt', 'updatedAt'],
        },
        CreatePostRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the post',
              example: 'Getting Started with React',
              minLength: 1,
              maxLength: 255,
            },
            content: {
              type: 'string',
              description: 'Content of the post',
              example: 'React is a JavaScript library for building user interfaces...',
              minLength: 1,
              maxLength: 10000,
            },
            published: {
              type: 'boolean',
              description: 'Whether the post should be published immediately',
              example: false,
              default: false,
            },
          },
          required: ['title', 'content'],
        },
        UpdatePostRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the post',
              example: 'Updated Title',
              minLength: 1,
              maxLength: 255,
            },
            content: {
              type: 'string',
              description: 'Content of the post',
              example: 'Updated content...',
              minLength: 1,
              maxLength: 10000,
            },
            published: {
              type: 'boolean',
              description: 'Whether the post should be published',
              example: true,
            },
          },
        },
        SearchPostsQuery: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query for title or content',
              example: 'react',
            },
            page: {
              type: 'integer',
              description: 'Page number for pagination',
              example: 1,
              minimum: 1,
              default: 1,
            },
            limit: {
              type: 'integer',
              description: 'Number of items per page',
              example: 10,
              minimum: 1,
              maximum: 100,
              default: 10,
            },
            sort: {
              type: 'string',
              enum: ['createdAt', 'updatedAt', 'title'],
              description: 'Field to sort by',
              example: 'createdAt',
              default: 'createdAt',
            },
            order: {
              type: 'string',
              enum: ['asc', 'desc'],
              description: 'Sort order',
              example: 'desc',
              default: 'desc',
            },
            published: {
              type: 'string',
              enum: ['true', 'false'],
              description: 'Filter by published status',
              example: 'true',
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Whether the request was successful',
              example: true,
            },
            data: {
              description: 'Response data',
            },
            message: {
              type: 'string',
              description: 'Success message',
              example: 'Post created successfully',
            },
            count: {
              type: 'integer',
              description: 'Total count (for list endpoints)',
              example: 5,
            },
          },
          required: ['success'],
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Post',
              },
              description: 'Array of posts',
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  description: 'Current page number',
                  example: 1,
                },
                limit: {
                  type: 'integer',
                  description: 'Items per page',
                  example: 10,
                },
                total: {
                  type: 'integer',
                  description: 'Total number of items',
                  example: 25,
                },
                totalPages: {
                  type: 'integer',
                  description: 'Total number of pages',
                  example: 3,
                },
                hasNext: {
                  type: 'boolean',
                  description: 'Whether there is a next page',
                  example: true,
                },
                hasPrev: {
                  type: 'boolean',
                  description: 'Whether there is a previous page',
                  example: false,
                },
              },
              required: ['page', 'limit', 'total', 'totalPages', 'hasNext', 'hasPrev'],
            },
          },
          required: ['data', 'pagination'],
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Whether the request was successful',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Post not found',
                },
                statusCode: {
                  type: 'integer',
                  description: 'HTTP status code',
                  example: 404,
                },
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Error timestamp',
                  example: '2024-01-01T00:00:00.000Z',
                },
                path: {
                  type: 'string',
                  description: 'Request path',
                  example: '/api/posts/999',
                },
                details: {
                  type: 'object',
                  description: 'Validation error details',
                  additionalProperties: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
              required: ['message', 'statusCode', 'timestamp', 'path'],
            },
          },
          required: ['success', 'error'],
        },
        StatsResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Whether the request was successful',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                published: {
                  type: 'integer',
                  description: 'Number of published posts',
                  example: 15,
                },
                drafts: {
                  type: 'integer',
                  description: 'Number of draft posts',
                  example: 5,
                },
                total: {
                  type: 'integer',
                  description: 'Total number of posts',
                  example: 20,
                },
              },
              required: ['published', 'drafts', 'total'],
            },
          },
          required: ['success', 'data'],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const specs = swaggerJsdoc(options);
