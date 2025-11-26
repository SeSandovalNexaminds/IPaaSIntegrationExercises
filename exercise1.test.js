const { transformWorkdayToSalesforce } = require("./exercise1");

describe("Exercise 1 – transformWorkdayToSalesforce", () => {

  // ---------------------------
  // SUCCESS CASES
  // ---------------------------

  test("transforms valid input correctly", () => {
    const input = {
      id: 100,
      email: "john@example.com",
      department: "Sales",
      start_date: "2025-01-15",
      phone: null
    };

    const result = transformWorkdayToSalesforce(input);

    expect(result.success).toBe(true);
    expect(result.data.employeeId).toBe(100);
    expect(result.data.contact.emailAddress).toBe("john@example.com");
    expect(result.data.contact.phoneNumber).toBe("N/A");
    expect(result.data.metadata.group).toBe("Sales");
    expect(result.data.metadata.startDate).toBe("1/15/2025");
  });

  test("trims department field", () => {
    const input = {
      id: 1,
      email: "a@b.com",
      department: "  Engineering  ",
      start_date: "2024-02-01"
    };

    const result = transformWorkdayToSalesforce(input);
    expect(result.data.metadata.group).toBe("Engineering");
  });

  test("keeps valid phone number when provided", () => {
    const input = {
      id: 1,
      email: "a@b.com",
      department: "IT",
      start_date: "2024-01-01",
      phone: "555-1234"
    };

    const result = transformWorkdayToSalesforce(input);
    expect(result.data.contact.phoneNumber).toBe("555-1234");
  });

  test("uses 'N/A' for undefined phone", () => {
    const input = {
      id: 1,
      email: "a@b.com",
      department: "IT",
      start_date: "2024-01-01",
      phone: undefined
    };

    const result = transformWorkdayToSalesforce(input);
    expect(result.data.contact.phoneNumber).toBe("N/A");
  });

  // ---------------------------
  // MISSING FIELD VALIDATION
  // ---------------------------

  test("fails when id is missing", () => {
    const result = transformWorkdayToSalesforce({
      email: "a@b.com",
      department: "Sales",
      start_date: "2024-01-01"
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Missing required fields");
    expect(result.input).toBeDefined();
  });

  test("fails when email is missing", () => {
    const result = transformWorkdayToSalesforce({
      id: 1,
      department: "Sales",
      start_date: "2024-01-01"
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Missing required fields");
  });

  test("fails when department is missing", () => {
    const result = transformWorkdayToSalesforce({
      id: 1,
      email: "a@b.com",
      start_date: "2024-01-01"
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Missing required fields");
  });

  test("fails when start_date is missing", () => {
    const result = transformWorkdayToSalesforce({
      id: 1,
      email: "a@b.com",
      department: "IT"
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Missing required fields");
  });

  // ---------------------------
  // INVALID DATE HANDLING
  // ---------------------------

  test("fails when start_date is invalid", () => {
    const result = transformWorkdayToSalesforce({
      id: 1,
      email: "a@b.com",
      department: "Sales",
      start_date: "xx-yy-zz"
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid date");
  });

  test("fails when start_date is empty string", () => {
    const result = transformWorkdayToSalesforce({
      id: 1,
      email: "a@b.com",
      department: "Sales",
      start_date: ""
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid date");
  });

  // ---------------------------
  // STRUCTURE AND METADATA
  // ---------------------------

  test("returns input inside error object", () => {
    const badInput = { x: 1 };
    const result = transformWorkdayToSalesforce(badInput);

    expect(result.success).toBe(false);
    expect(result.input).toEqual(badInput);
  });

});
