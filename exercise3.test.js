const { processEvents } = require("./exercise3");

describe("Exercise 3 - Event Processing", () => {
  test("sorts, dedupes, validates", () => {
    const input = [
      { event_id: 10, type: "create", timestamp: 200, payload: { id: 1 } },
      { event_id: 10, type: "create", timestamp: 100, payload: { id: 1 } },
      { event_id: 12, timestamp: 150, payload: { id: 2 } },
      { event_id: 13, type: "update", timestamp: 180 }
    ];
    const result = processEvents(input);
    expect(result.validEvents.length).toBe(2);
    expect(result.invalidEvents.length).toBe(1);
  });
});
