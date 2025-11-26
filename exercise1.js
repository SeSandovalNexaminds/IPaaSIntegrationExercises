function transformWorkdayToSalesforce(data) {
  try {
    if (!data.id || !data.email || !data.department) {
      throw new Error("Missing required fields");
    }
    const d = new Date(data.start_date);
    if (isNaN(d)) throw new Error("Invalid date");
    const formatted = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    return {
      success: true,
      data: {
        employeeId: data.id,
        contact: { emailAddress: data.email, phoneNumber: data.phone || "N/A" },
        metadata: { group: data.department, startDate: formatted }
      }
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
module.exports = { transformWorkdayToSalesforce };
