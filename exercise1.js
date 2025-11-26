/**
 * Exercise 1 – Data Transformation (Easy)
 *
 * You are given a Workday-style employee object and must transform it to a
 * Salesforce-style object.
 *
 * REQUIREMENTS:
 *
 * Input example:
 * {
 *   id: 318,
 *   email: "john@example.com",
 *   department: "Sales",
 *   start_date: "2025-01-01",
 *   phone: null
 * }
 *
 * 1. Required fields:
 *    - id
 *    - email
 *    - department
 *    - start_date
 *    If any are missing, return:
 *      { success: false, error: "Missing required fields", input: <original> }
 *
 * 2. Date conversion:
 *    - Convert start_date from "YYYY-MM-DD" -> "MM/DD/YYYY"
 *    - If invalid date, return:
 *      { success: false, error: "Invalid date", input: <original> }
 *
 * 3. Phone:
 *    - If phone is null or undefined, use "N/A"
 *    - Otherwise, use the provided value as-is
 *
 * 4. Department:
 *    - Trim whitespace from department (e.g., "  Sales  " -> "Sales")
 *
 * 5. Successful result:
 *    {
 *      success: true,
 *      data: {
 *        employeeId: <id>,
 *        contact: {
 *          emailAddress: <email>,
 *          phoneNumber: <phone or "N/A">
 *        },
 *        metadata: {
 *          group: <trimmed department>,
 *          startDate: <converted date>
 *        }
 *      }
 *    }
 *
 * Implement the function below to satisfy the tests.
 */

function transformWorkdayToSalesforce(data) {
  // TODO: Implement this function according to the requirements above.
  throw new Error("Not implemented");
}

module.exports = { transformWorkdayToSalesforce };
