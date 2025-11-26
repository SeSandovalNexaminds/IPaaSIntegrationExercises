function processEvents(events) {
  const valid = [];
  const invalid = [];
  const seen = new Set();
  const sorted = events.sort((a, b) => a.timestamp - b.timestamp);

  for (const e of sorted) {
    if (!e.payload) {
      invalid.push({ event_id: e.event_id, reason: "Missing payload" });
      continue;
    }
    if (seen.has(e.event_id)) continue;
    seen.add(e.event_id);
    valid.push({ event_id: e.event_id, type: e.type || "unknown", timestamp: e.timestamp, payload: e.payload });
  }

  return { validEvents: valid, invalidEvents: invalid };
}
module.exports = { processEvents };
