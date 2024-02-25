/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
   clearMocks: true,
   coverageProvider: "v8",
   moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
   roots: ["<rootDir>/app"],
   testMatch: ["**/__tests__/**/*.test.ts"],
   transform: { "^.+\\.tsx?$": "ts-jest" },
   // preset: "ts-jest",
   // testEnvironment: "node",
};
