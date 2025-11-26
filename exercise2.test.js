const { callWithRetry, _internal } = require("./exercise2");

describe("Exercise 2 – Retry Logic + Idempotency", () => {

  beforeEach(() => {
    _internal.counter = 0;
  });

  test("succeeds after retries and returns data on first successful call", async () => {
    const result = await callWithRetry();

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.id).toBe(42);
    // Should have tried exactly 3 times: 2 failures + 1 success
    expect(_internal.counter).toBe(3);
  });

  test("returns duplicate message and null data on second successful call with same id", async () => {
    const first = await callWithRetry();
    expect(first.success).toBe(true);
    expect(first.data).toBeDefined();

    const second = await callWithRetry();
    expect(second.success).toBe(true);
    expect(second.data).toBeNull();
    expect(second.message).toBe("Duplicate ignored");
  });

  test("fails after 3 attempts if API keeps failing", async () => {
    // Force the API to always fail by starting from a very large counter
    _internal.counter = 9999;

    const result = await callWithRetry();

    expect(result.success).toBe(false);
    expect(result.error).toBe("API failed after 3 attempts");
  });

});
