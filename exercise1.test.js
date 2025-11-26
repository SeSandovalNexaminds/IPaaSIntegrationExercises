const { transformWorkdayToSalesforce } = require("./exercise1");

describe("Exercise 1 - Data Transformation", () => {
  test("successful transform", () => {
    const input = { id: 318, email: "john@example.com", department: "Sales", start_date: "2025-01-01", phone: null };
    const result = transformWorkdayToSalesforce(input);
    expect(result.success).toBe(true);
    expect(result.data.employeeId).toBe(318);
    expect(result.data.contact.phoneNumber).toBe("N/A");
    expect(result.data.metadata.startDate).toBe("1/1/2025");
  });
});
