/**
 * Exercise 3 – Webhook Event Pipeline (Hard)
 *
 * You receive an array of webhook events and must normalize them.
 *
 * REQUIREMENTS:
 *
 * Each event looks like:
 * {
 *   event_id: <number>,
 *   type: <string | undefined>,
 *   timestamp: <number>,
 *   payload: <object | undefined>
 * }
 *
 * 1. Sort:
 *    - Sort events by ascending timestamp.
 *
 * 2. Deduplicate:
 *    - Use event_id as a unique key.
 *    - If multiple events have the same event_id, KEEP ONLY the one with the
 *      EARLIEST timestamp.
 *
 * 3. Validation:
 *    - If payload is missing (null or undefined), the event is INVALID.
 *      Add an entry to invalidEvents: { event_id, reason: "Missing payload" }
 *    - If type is missing, set type = "unknown" but treat the event as valid.
 *
 * 4. Output:
 *    Return an object:
 *    {
 *      validEvents: [ ...normalized events... ],
 *      invalidEvents: [ { event_id, reason }, ... ]
 *    }
 *
 * 5. Valid event structure:
 *    {
 *      event_id: <number>,
 *      type: <string>,          // never undefined, "unknown" if missing
 *      timestamp: <number>,
 *      payload: <object>
 *    }
 *
 * Implement the function below to satisfy the tests.
 */

function processEvents(events) {
  // TODO: Implement this function according to the requirements above.
  // The current implementation is intentionally incomplete so that tests fail.
  throw new Error("Not implemented");
}

module.exports = { processEvents };
