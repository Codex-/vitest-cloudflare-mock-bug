# Mocking bug with `@cloudflare/vitest-pool-workers`

This is a minimal reproduction of the issue where when running tests in watch mode, repeated runs cause mocked
modules to no longer match between the test body and the caller.

## Run

```shell
pnpm test
```

### First result

Runs as expected

```ascii
 DEV  v2.1.2 /Users/alexmiller/dev/p/vitest-cloudflare-mock-bug

[vpw:inf] Starting isolated runtimes for vitest.config.mts...
stdout | test/utils.spec.ts > util > wrappedPRetry > correctly calls p-retry with the same parameters
test          mocked pRetry: f4163929-66c8-4313-9fc5-43e4c8388bdd
retryToResult mocked pRetry: f4163929-66c8-4313-9fc5-43e4c8388bdd

 ✓ test/index.spec.ts (2)
 ✓ test/utils.spec.ts (1)

 Test Files  2 passed (2)
      Tests  3 passed (3)
   Start at  10:57:21
   Duration  950ms (transform 45ms, setup 0ms, collect 56ms, tests 39ms, environment 0ms, prepare 341ms)
```

### Second result

```ascii
 RERUN  rerun all tests

[vpw:dbg] Reusing runtime for vitest.config.mts...
stdout | test/utils.spec.ts > util > wrappedPRetry > correctly calls p-retry with the same parameters
test          mocked pRetry: 423dd1c7-2ec4-40bd-9a84-03360621be7c
retryToResult mocked pRetry: f4163929-66c8-4313-9fc5-43e4c8388bdd

 ✓ test/index.spec.ts (2)
 ❯ test/utils.spec.ts (1)
   ❯ util (1)
     ❯ wrappedPRetry (1)
       × correctly calls p-retry with the same parameters

------ Failed Tests 1 ------

 FAIL  test/utils.spec.ts > util > wrappedPRetry > correctly calls p-retry with the same parameters
AssertionError: expected "spy" to be called with arguments: [ [Function retryFunction], …(1) ]

Received:



Number of calls: 0

 ❯ test/utils.spec.ts:32:19
     30|
     31|    // Assert
     32|    expect(pRetry).toBeCalledWith(retryFunction, retryOpts);
       |                   ^
     33|   });
     34|  });

------[1/1]⎯

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 2 passed (3)
   Start at  10:57:38
   Duration  47ms
```
