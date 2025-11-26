/**
 * Exercise 2 – Retry Logic + Idempotency (Medium)
 *
 * You are calling a flaky external API. Implement a robust wrapper.
 *
 * REQUIREMENTS:
 *
 * There is a provided mock: callExternalAPI().
 * - On the first two calls, it throws: new Error("Temporary API failure")
 * - On the third and subsequent calls, it returns:
 *      { id: 42, value: "sample", timestamp: <number> }
 *
 * Implement callWithRetry() with the following behavior:
 *
 * 1. It should call callExternalAPI(), and if it succeeds:
 *      - If this ID (result.id) has never been seen before:
 *          return { success: true, data: result }
 *      - If this ID WAS seen in a previous successful callWithRetry():
 *          return { success: true, data: null, message: "Duplicate ignored" }
 *
 * 2. On failure:
 *      - It should retry up to a TOTAL of 3 attempts.
 *      - If all 3 attempts fail, return:
 *          { success: false, error: "API failed after 3 attempts" }
 *
 * 3. Use async/await. Do not modify the test file.
 */

let counter = 0;

// This mock simulates an unreliable external API.
async function callExternalAPI() {
  counter++;

  if (counter < 3) {
    throw new Error("Temporary API failure");
  }

  return {
    id: 42,
    value: "sample",
    timestamp: Date.now()
  };
}

// TODO: Implement global tracking of seen IDs for idempotency.
// e.g. const seenIds = new Set();

// TODO: Implement this function according to the requirements above.
// The current implementation is intentionally incomplete so that tests fail.
async function callWithRetry() {
  throw new Error("Not implemented");
}

module.exports = {
  callWithRetry,
  callExternalAPI,
  _internal: {
    get counter() { return counter; },
    set counter(v) { counter = v; }
    // You may add helper getters/setters here if needed,
    // tests only rely on "counter".
  }
};
