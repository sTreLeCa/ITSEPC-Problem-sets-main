# Problem Set 2: Cityscape

**Purpose:** Practice designing, testing, and implementing Abstract Data Types (ADTs), focusing on mutable types and test-first programming.

**This problem set will help you master:**

- **Test-Driven Development:** Writing tests _before_ implementation to guide your design and ensure correctness.
- **Abstract Data Type Design:** Creating well-specified and robust ADTs.
- **Representation Invariants and Abstraction Functions:** Documenting and enforcing data integrity.
- **Preventing Rep Exposure:** Designing ADTs to protect their internal representations.
- **Working with Mutable Data Types:** Understanding the challenges and best practices for mutable objects.
- **Using Generics:** Creating flexible and reusable ADTs that work with different types of data.

**Get the Code:**

1.  **GitHub Repository:** PS2-cistyscrape is under main branch of https://github.com/Mathe-S/ITSEPC-Problem-sets
    You need to run

    ```
    git pull origin main
    ```

    to update your local repository to the main branch.

2.  **Install:** Navigate into your cloned directory in the terminal (`cd ps2-yourusername`) and run `npm install` to install project dependencies.
3.  **Open in VS Code:** Open the `ps2-yourusername` folder in VS Code to start working on the problem set.

**Overview:**

In this problem set, you'll be building software to model a virtual city! You'll create two main toolboxes (ADTs):

- **`RegionSet` ADT (Problems 1-3):** A 2D map representing labeled, contiguous regions of land in your city. You'll implement _two different versions_ of this toolbox to see different ways of storing data.
- **`City` ADT (Problem 4):** A 3D city model, built using your `RegionSet` toolbox to represent building floors.

**Problems:**

- **Problems 1-3: `RegionSet` ADT:**

  - **Problem 1: Test `RegionSet<string>`:** Write comprehensive tests in `RegionSetTest.ts` for the `RegionSet` ADT, focusing on string labels initially.
  - **Problem 2: Implement `RepMapRegionSet<L>`:** Implement the `RegionSet` ADT using a `Map` as its internal representation in `src/RegionSetImpl.ts`. First implement it for `string` labels, then make it generic to handle labels of any type `L`.
  - **Problem 3: Implement `RepArrayRegionSet<L>`:** Implement a _second_ version of the `RegionSet` ADT, `RepArrayRegionSet`, using a 2D `Array` as its internal representation, also in `src/RegionSetImpl.ts`. Make it generic as well.

- **Problem 4: `City<L>` ADT:**
  - **Problem 4.1: Test `City<L>`:** Write tests for the `City` ADT in `CityTest.ts`.
  - **Problem 4.2: Implement `City<L>`:** Implement the `City` ADT in `src/City.ts`, using your `RegionSet` ADT as a building block to represent building floors.

**Design Freedom and Restrictions:**

- **Design Freedom:** You have significant design freedom for choosing classes, methods, and helper functions within `src/RegionSetImpl.ts` and `src/City.ts`.
- **Restrictions:**
  - **Follow Specifications:** You **must** adhere to the specifications provided in the `RegionSet.ts` and `City.ts` interfaces. Do not change these specifications.
  - **File Names:** Do not change the filenames for `algorithm.ts`, `algorithmTest.ts`, etc.
  - **Function Signatures:** Do not change the signatures of exported functions.
  - **Exported Items:** Do not export any new items from `src/algorithm.ts` beyond the specified functions.
  - **Strengthening `getHint()`:** For `getHint()` in PS1, you were allowed to strengthen the spec. In PS2, you must implement the provided specs as-is.

**Iterative Workflow (Recommended Steps):**

For **each function** and **ADT** you implement, follow this iterative workflow:

1.  **Understand the Specifications:** Carefully read the TypeDoc comments in the provided `src/*.ts` files to fully understand the requirements (preconditions, postconditions, behavior).
2.  **Write Tests First:**
    - **Testing Strategy:** Devise and document a clear testing strategy in the test file (`RegionSetTest.ts`, `CityTest.ts`). Use partitioning to cover different input and output scenarios.
    - **Test Cases:** Write small, focused Mocha test cases (using `it(...)`) in the test files, based on your testing strategy. Remember to test for both typical cases and edge cases.
3.  **Implement:** Write the TypeScript code for the function or ADT in the appropriate `src/*.ts` file. Focus on correctness, clarity, and following the specifications.
4.  **Test and Debug:** Run your tests (`npm test`). If tests fail, debug your implementation, revise your code, and re-run tests until they pass.
5.  **Commit and Push:** Use `git add`, `git commit`, and `git push` to save your work to Git after each significant step (writing tests, implementing a function, fixing a bug).

**Important Testing Advice:**

- **Partitioning:** Use input and output partitioning to create a thorough and effective test suite.
- **Testing Strategy Comments:** Document your testing strategy at the top of each test file.
- **Small Test Cases:** Keep your test cases small and focused, testing specific partitions.
- **Test for Bugs:** Design tests that specifically try to expose potential bugs and violations of the specifications.
- **Legal Clients:** Ensure your tests are legal clients of the specifications – do not make assumptions beyond what the spec guarantees.
- **`it()` Functions:** Put each test case in its own `it()` function for better error reporting and debugging.
- **Coverage Tool:** Use `npm run coverage` to check code coverage and identify areas not adequately tested.
- **`strictEqual` & `deepStrictEqual`:** Use `assert.strictEqual` for primitive types and `assert.deepStrictEqual` for comparing data structures (arrays, sets, maps, object literals).
- **Helper Functions in Tests:** Be careful about calling helper functions from your test code. Helper functions for testing should go in the `test/` folder, or in `src/utils.ts` if needed by both test and implementation code.
- **Avoid Large Test Inputs:** Keep test inputs reasonably sized to avoid performance issues and focus on testing logic, not resource exhaustion.

**Important Implementation Advice:**

- **Abstraction Function (AF) & Representation Invariant (RI):** For each class you implement, document the AF and RI as comments near the field declarations in your `.ts` files. Also document how you prevent Rep Exposure. See the "Documenting the AF, RI, & SRE" reading for guidance.
- **`checkRep()`:** Implement a `checkRep()` method in each class to assert the RI at runtime. Call `checkRep()` at the end of every creator, producer, and mutator method.
- **`toString()`:** Implement a useful `toString()` method for debugging.
- **Helper Functions:**
  - **Small Private Helpers:** For small, implementation-specific helper functions, define them as `private` within your classes in `src/*.ts`. These don't need separate tests.
  - **Larger or Reusable Helpers:** For more complex or reusable helper functions, create them in `src/utils.ts` and write tests for them in `test/utilsTest.ts`. Export these helpers from `utils.ts`.
  - **No Testing Code in `src/`:** Do not put helper functions intended _only_ for testing in `src/`. Keep test-specific helpers in `test/`.
- **Eliminate Warnings:** Address all TypeScript compiler and ESLint warnings in VS Code to improve code quality.
- **Code Review:** Review your own code critically for clarity, correctness, and adherence to the "Safe from Bugs," "Easy to Understand," and "Ready for Change" principles.
- **Test Frequently:** Run your tests after every code change to catch bugs early.
- **`npm test -- -f 'pattern'`:** Use this command to run specific tests matching a pattern, useful for focused debugging.
- **`console.log` & `util.inspect`:** Use `console.log` with multiple arguments or `util.inspect()` for more helpful debugging output, especially for complex objects like Maps and Sets.
- **Commit Frequently:** Commit and push your work to Git regularly to save progress and enable collaboration.

**Deliverables:**

For each problem:

- **Problem 1: Test `RegionSet<string>`:**
  - `test/RegionSetTest.ts`: Your testing strategy comment and Mocha test cases for `RegionSet<string>`.
- **Problem 2: Implement `RepMapRegionSet<L>`:**
  - `src/RegionSetImpl.ts`: Implementation of `RepMapRegionSet<string>` and then generic `RepMapRegionSet<L>`.
  - TypeDoc comments for all classes and methods.
  - Abstraction Function (AF) and Representation Invariant (RI) comments.
  - Rep Exposure Safety Argument comment.
  - `checkRep()` implementation.
  - `toString()` implementation.
- **Problem 3: Implement `RepArrayRegionSet<L>`:**
  - `src/RegionSetImpl.ts`: Implementation of generic `RepArrayRegionSet<L>`.
  - Documentation (TypeDoc, AF, RI, SRE, checkRep, toString) as in Problem 2.
- **Problem 3.2: Wrap up `RegionSet`:**
  - `src/RegionSet.ts`: Implementation of `makeRegionSet()` factory function.
- **Problem 4: `City<L>`:**
  - `test/CityTest.ts`: Your testing strategy comment and Mocha test cases for `City<L>`.
  - `src/City.ts`: Implementation of `City<L>`.
  - Documentation (TypeDoc, AF, RI, SRE, checkRep, toString) for `City` and any helper classes/interfaces you create.

**Grading:**

Your grade for PS2 will be based on:

- **Alpha Autograde (~40%):** Automated tests run by Autograder (partial feedback during development).
- **Alpha Manual Grade (~10%):** TA grading of your testing strategies and code quality for the alpha submission.
- **Beta Autograde (~35%):** More comprehensive automated tests run after the beta deadline.
- **Beta Manual Grade (~15%):** TA grading of your final code quality, documentation, and adherence to specifications.

**Before You're Done (Checklist):**

- [ ] All functions and ADTs are implemented and working correctly according to your tests.
- [ ] All tests in `test/RegionSetTest.ts` and `test/CityTest.ts` are passing (run `npm test`).
- [ ] Code coverage is satisfactory (run `npm run coverage` and review `coverage/index.html`).
- [ ] All code is free of ESLint and TypeScript compiler warnings (no yellow underlines in VS Code).
- [ ] All classes and methods have clear, well-formatted TypeDoc comments.
- [ ] All implementations have documented Abstraction Functions (AF), Representation Invariants (RI), and Rep Exposure Safety Arguments (SRE) as comments near field declarations.
- [ ] All ADTs have `checkRep()` methods to assert the RI at runtime, and `toString()` methods for debugging.
- [ ] You have committed and pushed all your work to your Git repository on GitHub.

Good luck, and enjoy building your virtual city! Remember to ask questions on Teams or in office hours if you get stuck.
