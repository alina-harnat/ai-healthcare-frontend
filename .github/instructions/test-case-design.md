# Manual Test Case Design

## Objective

Generate detailed, reproducible manual test cases based on the requirements analysis.

## Procedure

### 1. Design test cases

- Cover all applicable requirements and acceptance criteria.
- Include relevant positive, negative, boundary, state-transition, and regression scenarios.
- Use the `manual-test-design` skill when selecting test-design techniques.
- Keep independent scenarios separate and avoid redundant cases.
- Do not invent requirements or unsupported expected behavior.

### 2. Define detailed test cases

Every test case must be specific, reproducible, and independently verifiable. Optimize for execution clarity, not test-case count.

#### Preconditions

- Specify the required initial state, test account or data, dependencies, and configuration.
- Describe relevant properties of the test input, including exact values or characteristics when necessary.
- Do not repeat generic setup that does not affect the scenario.

#### Steps

- Write explicit, numbered actions in the order they must be performed.
- Specify the actual page, GraphQL operation, input fields, values, and relevant parameters.
- Include the exact test data needed to reproduce the scenario.
- Separate actions and verification points into distinct steps when this improves clarity.
- State what to inspect and where to find it.
- Do not use vague actions such as "submit valid data", "check the response", or "verify the result" without specifying the data or verification target.
- Do not combine independent scenarios into one test case.

#### Expected result

- Describe observable outcomes and measurable pass/fail criteria.
- Specify the expected response fields, values, state changes, validation behavior, or error handling when supported by requirements or verified implementation.
- Include all important assertions, not just the primary success or failure outcome.
- For data extraction or recognition, compare the returned data against known reference data when available.
- Do not repeat the steps or use vague statements such as "the system works correctly".
- Never invent exact messages, response fields, status codes, limits, or behavior that has not been established.

#### Required design depth

Before writing a case, identify:

1. The specific requirement or risk it verifies.
2. The input and initial state required.
3. The action that triggers the behavior.
4. The observable outcome that determines pass or fail.

Include all four elements in the case, using the appropriate fields.

Use separate cases for materially different inputs, validation rules, outcomes, or failure modes. Keep related assertions together when they verify the same behavior.

A case is not complete if another tester must guess which data to enter, which operation to call, what to inspect, or what outcome constitutes a pass.

### 3. Return valid JSON

Return the complete test suite as a JSON array using exactly these keys:

`id`, `title`, `preconditions`, `steps`, `expectedResult`, `status`.

Example:
[
{
"id": "TC-001",
"title": "Verify the expected behavior",
"preconditions": "The required initial state is established.",
"steps": "1. Open the relevant page.\n2. Perform the specified action.",
"expectedResult": "The application produces the outcome defined by the requirement.",
"status": "Not Run"
}
]

JSON rules:

- Use valid JSON syntax and double quotes.
- Keep all six fields as strings.
- Represent steps as a numbered string, using `\n` between steps when appropriate.
- Do not include comments, Markdown, or explanatory text inside the JSON.
- Follow the project's `TestCase` type and existing export script conventions.

### 4. Separate automated testing

Track unit and integration testing requirements separately. Do not represent automated test implementation tasks as manual test cases.

### 5. Review the output

Before delivery, verify that the JSON is valid, all required fields are present, IDs are unique and sequential, and the cases follow the analyzed requirements.

Then follow `instructions/coverage-review.md` for the full coverage and quality review.

## Rules

- Do not modify application code.
- Do not claim that tests were executed unless execution was verified.
- Report unresolved ambiguities rather than inventing expected behavior.
