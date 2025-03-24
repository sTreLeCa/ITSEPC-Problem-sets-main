import assert from "assert";
import { Rect } from "../src/Rect";
import { RegionSet, makeRegionSet } from "../src/RegionSet";
import { implementations } from "../src/RegionSetImpl";

// Dynamic test discovery for implementations of RegionSet<string>.
// You should not need to modify this code.
describe("RegionSet", function () {
  for (const impl of implementations()) {
    const SomeRegionSetOfString = impl as new (
      gridSize: number
    ) => RegionSet<string>; // necessary cast for TS

    describe(SomeRegionSetOfString.name, function () {
      it("example test case, replace with your own tests", function () {
        // Tests must be legal clients of the RegionSet<string> spec.
        // In particular, tests should only call operations of the RegionSet interface,
        // and should not make assumptions about the implementation class (RepMapRegionSet vs RepArrayRegionSet).
        const rs: RegionSet<string> = new SomeRegionSetOfString(5);
        assert.strictEqual(rs.labels().size, 0, "initial labels()");
        assert.strictEqual(
          rs.getRegion("A"),
          undefined,
          'initial getRegion("A")'
        );
      });

      // Put your testing strategy and test cases here
      /*
       * Testing strategy
       *
       * ...
       */
    });
  }
});
