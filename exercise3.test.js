const { processEvents } = require("./exercise3");

describe("Exercise 3 – Webhook Event Pipeline", () => {

  test("sorts by timestamp and keeps earliest duplicate per event_id", () => {
    const result = processEvents([
      { event_id: 5, type: "x", timestamp: 300, payload: { a: 1 } },
      { event_id: 5, type: "y", timestamp: 100, payload: { a: 2 } }
    ]);

    expect(result.validEvents.length).toBe(1);
    expect(result.validEvents[0].event_id).toBe(5);
    expect(result.validEvents[0].timestamp).toBe(100);
    expect(result.validEvents[0].payload).toEqual({ a: 2 });
  });

  test("marks missing payload as invalid and does not include in validEvents", () => {
    const result = processEvents([
      { event_id: 1, type: "create", timestamp: 100 },
      { event_id: 2, type: "create", timestamp: 200, payload: { id: 1 } }
    ]);

    expect(result.validEvents).toHaveLength(1);
    expect(result.validEvents[0].event_id).toBe(2);

    expect(result.invalidEvents).toHaveLength(1);
    expect(result.invalidEvents[0]).toEqual({
      event_id: 1,
      reason: "Missing payload"
    });
  });

  test("assigns 'unknown' when type is missing", () => {
    const result = processEvents([
      { event_id: 1, timestamp: 100, payload: { x: 1 } }
    ]);

    expect(result.validEvents).toHaveLength(1);
    expect(result.validEvents[0].type).toBe("unknown");
  });

  test("processes a mixed list correctly", () => {
    const input = [
      { event_id: 10, type: "create", timestamp: 200, payload: { id: 1 } },
      { event_id: 10, type: "create", timestamp: 100, payload: { id: 1 } },
      { event_id: 12, timestamp: 150, payload: { id: 2 } },
      { event_id: 13, type: "update", timestamp: 180 }
    ];

    const result = processEvents(input);

    expect(result.validEvents.length).toBe(2);
    expect(result.invalidEvents.length).toBe(1);

    expect(result.validEvents[0].event_id).toBe(10);
    expect(result.validEvents[0].timestamp).toBe(100);
    expect(result.validEvents[1].event_id).toBe(12);
    expect(result.validEvents[1].type).toBe("unknown");

    expect(result.invalidEvents[0].event_id).toBe(13);
    expect(result.invalidEvents[0].reason).toBe("Missing payload");
  });

  test("handles list of only invalid events", () => {
    const input = [
      { event_id: 1, timestamp: 100 },
      { event_id: 2, timestamp: 200 },
      { event_id: 3, timestamp: 300 }
    ];

    const result = processEvents(input);

    expect(result.validEvents).toHaveLength(0);
    expect(result.invalidEvents).toHaveLength(3);
  });

  test("handles list with all valid events and sorts them", () => {
    const input = [
      { event_id: 1, type: "a", timestamp: 200, payload: {} },
      { event_id: 2, type: "b", timestamp: 100, payload: {} }
    ];

    const result = processEvents(input);

    expect(result.validEvents.length).toBe(2);
    expect(result.validEvents[0].timestamp).toBe(100);
    expect(result.validEvents[1].timestamp).toBe(200);
  });

});
