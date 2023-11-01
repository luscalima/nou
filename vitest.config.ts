import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "tests",
    globals: true,
    clearMocks: true,
    coverage: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
      reportsDirectory: "coverage",
    },
  },
});
