const { callWithRetry, _internal } = require("./exercise2");

describe("Exercise 2 - Retry + Idempotency", () => {
  beforeEach(() => { _internal.counter = 0; });

  test("succeeds after retries", async () => {
    const result = await callWithRetry();
    expect(result.success).toBe(true);
    expect(result.data.id).toBe(42);
  });
});
