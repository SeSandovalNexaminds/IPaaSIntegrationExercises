let counter = 0;
async function callExternalAPI() {
  counter++;
  if (counter < 3) throw new Error("Temporary API failure");
  return { id: 42, value: "sample", timestamp: Date.now() };
}

async function callWithRetry() {
  const seenIds = new Set();
  let delay = 100;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await callExternalAPI();
      if (seenIds.has(result.id)) return { success: true, data: null, message: "Duplicate ignored" };
      seenIds.add(result.id);
      return { success: true, data: result };
    } catch (err) {
      if (attempt === 3) return { success: false, error: "API failed after 3 attempts" };
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }
}
module.exports = { callWithRetry, callExternalAPI, _internal: { get counter(){return counter;}, set counter(v){counter=v;} } };
