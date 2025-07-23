// Configuração global para testes
beforeAll(async () => {
  // Configurações globais antes dos testes
});

afterAll(async () => {
  // Limpeza global após os testes
});

// Mock do console para reduzir ruído nos testes
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeEach(() => {
  console.log = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});
