# Basic Testing – Jest Solutions

This repository contains **unit tests for various JavaScript tasks** using Jest. All tests cover synchronous and asynchronous functions, class methods, Node.js APIs, library APIs, partial mocking, and snapshot testing.

---

## ⚡ Usage

```bash
# Install dependencies
npm install

# Run all tests
npm run test

# Run tests with verbose logging
npm run test:verbose
```

---

## 📂 Structure

| Folder                    | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `01-simple-tests`         | Unit tests for basic calculator operations.              |
| `02-table-tests`          | Table-driven tests for the same calculator.              |
| `03-error-handling-async` | Tests for async functions and error handling.            |
| `04-test-class`           | Tests for a `BankAccount` class with async operations.   |
| `05-partial-mocking`      | Partial module mocking using Jest.                       |
| `06-mocking-node-api`     | Mocking Node.js APIs: `fs`, `setTimeout`, `setInterval`. |
| `07-mocking-lib-api`      | Mocking external libraries: `axios`, `lodash`.           |
| `08-snapshot-testing`     | Snapshot testing and comparison testing.                 |

---

## ✅ Notes

* Recommended Node.js: **v24.x LTS** or higher.
* Ensure each test **completes within 30 seconds**.
* Make sure your code has **no TypeScript or linter errors**.
* All tests are isolated and **do not depend on the real filesystem or real API calls**.

---
