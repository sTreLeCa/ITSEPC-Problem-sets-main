import assert from "assert";
import { AnswerDifficulty, Flashcard, BucketMap } from "../src/flashcards";
import {
  toBucketSets,
  getBucketRange,
  practice,
  update,
  getHint,
  computeProgress,
} from "../src/algorithm";

/*
 * Testing strategy for toBucketSets():
 * 
 * Partitions:
 * - buckets Map size: empty, one bucket, multiple buckets
 * - bucket numbers: consecutive starting at 0, consecutive starting at non-zero, non-consecutive
 * - number of cards in each bucket: empty, one card, multiple cards
 * - buckets with/without the largest bucket number
 */
describe("toBucketSets()", () => {
  // Create some sample flashcards to use in testing
  const card1 = new Flashcard("front1", "back1", "hint1", ["tag1"]);
  const card2 = new Flashcard("front2", "back2", "hint2", ["tag2"]);
  const card3 = new Flashcard("front3", "back3", "hint3", ["tag3"]);
  const card4 = new Flashcard("front4", "back4", "hint4", ["tag4"]);
  const card5 = new Flashcard("front5", "back5", "hint5", ["tag5"]);

  it("converts an empty map to an empty array", () => {
    const emptyMap = new Map<number, Set<Flashcard>>();
    const result = toBucketSets(emptyMap);
    assert.strictEqual(result.length, 0);
  });

  it("handles a single bucket with a single card", () => {
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    
    const result = toBucketSets(bucketMap);
    
    assert.ok(result.length > 0, "Result should have at least one bucket");
    assert.ok(result[0] !== undefined, "Bucket 0 should exist");
    if (result[0]) { // TypeScript guard
      assert.strictEqual(result[0].size, 1);
      assert.ok(result[0].has(card1));
    }
  });

  it("handles multiple consecutive buckets starting at 0", () => {
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(1, new Set([card2]));
    bucketMap.set(2, new Set([card3]));
    
    const result = toBucketSets(bucketMap);
    
    assert.strictEqual(result.length, 3);
    
    assert.ok(result[0] !== undefined, "Bucket 0 should exist");
    assert.ok(result[1] !== undefined, "Bucket 1 should exist");
    assert.ok(result[2] !== undefined, "Bucket 2 should exist");
    
    if (result[0]) assert.ok(result[0].has(card1), "Bucket 0 should contain card1");
    if (result[1]) assert.ok(result[1].has(card2), "Bucket 1 should contain card2");
    if (result[2]) assert.ok(result[2].has(card3), "Bucket 2 should contain card3");
  });

  it("handles multiple buckets with multiple cards", () => {
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1, card2]));
    bucketMap.set(1, new Set([card3, card4]));
    
    const result = toBucketSets(bucketMap);
    
    assert.strictEqual(result.length, 2);
    
    assert.ok(result[0] !== undefined, "Bucket 0 should exist");
    assert.ok(result[1] !== undefined, "Bucket 1 should exist");
    
    if (result[0]) {
      assert.strictEqual(result[0].size, 2, "Bucket 0 should have 2 cards");
      assert.ok(result[0].has(card1) && result[0].has(card2), "Bucket 0 should contain card1 and card2");
    }
    
    if (result[1]) {
      assert.strictEqual(result[1].size, 2, "Bucket 1 should have 2 cards");
      assert.ok(result[1].has(card3) && result[1].has(card4), "Bucket 1 should contain card3 and card4");
    }
  });

  it("handles non-consecutive bucket numbers", () => {
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(2, new Set([card2]));
    bucketMap.set(5, new Set([card3]));
    
    const result = toBucketSets(bucketMap);
    
    assert.strictEqual(result.length, 6, "Result should have buckets 0-5");
    
    // Check each bucket exists
    for (let i = 0; i < 6; i++) {
      assert.ok(result[i] !== undefined, `Bucket ${i} should exist`);
    }
    
    // Now check contents with proper TypeScript guards
    if (result[0]) assert.ok(result[0].has(card1), "Bucket 0 should contain card1");
    if (result[1]) assert.strictEqual(result[1].size, 0, "Bucket 1 should be empty");
    if (result[2]) assert.ok(result[2].has(card2), "Bucket 2 should contain card2");
    if (result[3]) assert.strictEqual(result[3].size, 0, "Bucket 3 should be empty");
    if (result[4]) assert.strictEqual(result[4].size, 0, "Bucket 4 should be empty");
    if (result[5]) assert.ok(result[5].has(card3), "Bucket 5 should contain card3");
  });

  it("handles consecutive buckets not starting at 0", () => {
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(2, new Set([card1]));
    bucketMap.set(3, new Set([card2]));
    bucketMap.set(4, new Set([card3]));
    
    const result = toBucketSets(bucketMap);
    
    assert.strictEqual(result.length, 5, "Result should have buckets 0-4");
    
    // Check each bucket exists
    for (let i = 0; i < 5; i++) {
      assert.ok(result[i] !== undefined, `Bucket ${i} should exist`);
    }
    
    // Check contents with proper TypeScript guards
    if (result[0]) assert.strictEqual(result[0].size, 0, "Bucket 0 should be empty");
    if (result[1]) assert.strictEqual(result[1].size, 0, "Bucket 1 should be empty");
    if (result[2]) assert.ok(result[2].has(card1), "Bucket 2 should contain card1");
    if (result[3]) assert.ok(result[3].has(card2), "Bucket 3 should contain card2");
    if (result[4]) assert.ok(result[4].has(card3), "Bucket 4 should contain card3");
  });

  it("handles buckets with some empty sets", () => {
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set()); // Empty bucket
    bucketMap.set(1, new Set([card1]));
    bucketMap.set(2, new Set()); // Another empty bucket
    bucketMap.set(3, new Set([card2, card3]));
    
    const result = toBucketSets(bucketMap);
    
    assert.strictEqual(result.length, 4, "Result should have 4 buckets");
    
    // Check each bucket exists
    for (let i = 0; i < 4; i++) {
      assert.ok(result[i] !== undefined, `Bucket ${i} should exist`);
    }
    
    // Check contents with proper TypeScript guards
    if (result[0]) assert.strictEqual(result[0].size, 0, "Bucket 0 should be empty");
    if (result[1]) assert.strictEqual(result[1].size, 1, "Bucket 1 should have 1 card");
    if (result[2]) assert.strictEqual(result[2].size, 0, "Bucket 2 should be empty");
    if (result[3]) assert.strictEqual(result[3].size, 2, "Bucket 3 should have 2 cards");
  });

  it("returns new objects (doesn't modify input)", () => {
    const bucket0 = new Set([card1]);
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, bucket0);
    
    const result = toBucketSets(bucketMap);
    
    // Make sure we have a result and bucket 0 exists
    assert.ok(result.length > 0, "Result should have at least one bucket");
    assert.ok(result[0] !== undefined, "Bucket 0 should exist in result");
    
    // Add a card to the original set
    bucket0.add(card2);
    
    // The result should not be affected (using TypeScript guard)
    if (result[0]) {
      assert.strictEqual(result[0].size, 1, "Result bucket should still have 1 card");
      assert.ok(result[0].has(card1), "Result bucket should still have card1");
      assert.ok(!result[0].has(card2), "Result bucket should not have card2");
    }
  });
});

// Keep the other test descriptions as placeholders
/*
 * Testing strategy for getBucketRange():
 *
 * TODO: Describe your testing strategy for getBucketRange() here.
 */
describe("getBucketRange()", () => {
  // Create some sample flashcards to use in testing
  const card1 = new Flashcard("front1", "back1", "hint1", ["tag1"]);
  const card2 = new Flashcard("front2", "back2", "hint2", ["tag2"]);
  const card3 = new Flashcard("front3", "back3", "hint3", ["tag3"]);
  const card4 = new Flashcard("front4", "back4", "hint4", ["tag4"]);
  const card5 = new Flashcard("front5", "back5", "hint5", ["tag5"]);

  it("should return undefined when all buckets are empty", () => {
    const buckets: Set<Flashcard>[] = [
      new Set<Flashcard>(), // Empty bucket
      new Set<Flashcard>(), // Empty bucket
      new Set<Flashcard>(), // Empty bucket
    ];
    const result = getBucketRange(buckets);
    assert.strictEqual(result, undefined, "Range should be undefined for empty buckets");
  });

  it("should return undefined when all buckets are undefined", () => {
    const buckets: Array<Set<Flashcard> | undefined> = [undefined, undefined, undefined];
    const result = getBucketRange(buckets);
    assert.strictEqual(result, undefined, "Range should be undefined when all buckets are undefined");
  });

  it("should return the correct range when non-empty buckets are at the beginning", () => {
    const buckets: Set<Flashcard>[] = [
      new Set([card1]), // Bucket 0 with card1
      new Set([card2]), // Bucket 1 with card2
      new Set(), // Empty bucket
    ];
    const result = getBucketRange(buckets);
    assert.deepEqual(result, { minBucket: 0, maxBucket: 1 }, "Range should be from 0 to 1");
  });

  it("should return the correct range when non-empty buckets are at the end", () => {
    const buckets: Set<Flashcard>[] = [
      new Set(), // Empty bucket
      new Set(), // Empty bucket
      new Set([card1]), // Bucket 2 with card1
      new Set([card2]), // Bucket 3 with card2
    ];
    const result = getBucketRange(buckets);
    assert.deepEqual(result, { minBucket: 2, maxBucket: 3 }, "Range should be from 2 to 3");
  });

  it("should return the correct range when non-empty buckets are in the middle", () => {
    const buckets: Set<Flashcard>[] = [
      new Set(), // Empty bucket
      new Set([card1]), // Bucket 1 with card1
      new Set([card2]), // Bucket 2 with card2
      new Set(), // Empty bucket
    ];
    const result = getBucketRange(buckets);
    assert.deepEqual(result, { minBucket: 1, maxBucket: 2 }, "Range should be from 1 to 2");
  });

  it("should handle undefined buckets correctly", () => {
    const buckets: Array<Set<Flashcard> | undefined> = [
      undefined, // Undefined bucket
      new Set([card1]), // Bucket 1 with card1
      undefined, // Undefined bucket
      new Set([card2]), // Bucket 3 with card2
    ];
    const result = getBucketRange(buckets);
    assert.deepEqual(result, { minBucket: 1, maxBucket: 3 }, "Range should be from 1 to 3");
  });

  it("should return the correct range for a single non-empty bucket", () => {
    const buckets: Set<Flashcard>[] = [new Set([card1])]; // Only one bucket with card1
    const result = getBucketRange(buckets);
    assert.deepEqual(result, { minBucket: 0, maxBucket: 0 }, "Range should be 0 to 0");
  });

  it("should return undefined when the buckets array is empty", () => {
    const buckets: Array<Set<Flashcard> | undefined> = [];
    const result = getBucketRange(buckets);
    assert.strictEqual(result, undefined, "Range should be undefined when buckets array is empty");
  });
});




describe("practice()", () => {
    const card1 = new Flashcard("front1", "back1", "hint1", ["tag1"]);
    const card2 = new Flashcard("front2", "back2", "hint2", ["tag2"]);
    const card3 = new Flashcard("front3", "back3", "hint3", ["tag3"]);
  it("should return an empty set when all buckets are empty", () => {
    const emptyBuckets = [new Set<Flashcard>(), new Set<Flashcard>(), new Set<Flashcard>()];
    const result = practice(emptyBuckets, 1);
    assert.strictEqual(result.size, 0, "The result set should be empty when all buckets are empty");
  });

  it("should add flashcards from the first bucket when the day is divisible by 2^0", () => {
    const bucket0 = new Set([card1]);
    const buckets = [bucket0];

    const result = practice(buckets, 1); // 2^0 = 1, so day 1 should include flashcards from bucket 0
    assert.strictEqual(result.size, 1, "The result should contain one flashcard from bucket 0");
    assert.ok(result.has(card1), "The flashcard from bucket 0 should be included");
  });

  it("should add flashcards from multiple buckets based on the day", () => {
    
    
    const bucket0 = new Set([card1]);
    const bucket1 = new Set([card2]);
    const bucket2 = new Set([card3]);
    
    const buckets = [bucket0, bucket1, bucket2];

    const resultDay1 = practice(buckets, 1); // 2^0 = 1, 2^1 = 2, 2^2 = 4 (day 1 should include cards from bucket 0)
    assert.strictEqual(resultDay1.size, 1, "Day 1 should include one flashcard from bucket 0");
    assert.ok(resultDay1.has(card1), "Day 1 should include card1");

    const resultDay2 = practice(buckets, 2); // 2^0 = 1, 2^1 = 2, 2^2 = 4 (day 2 should include cards from bucket 0 and 1)
    assert.strictEqual(resultDay2.size, 2, "Day 2 should include flashcards from bucket 0 and 1");
    assert.ok(resultDay2.has(card1), "Day 2 should include card1");
    assert.ok(resultDay2.has(card2), "Day 2 should include card2");

    const resultDay4 = practice(buckets, 4); // 2^0 = 1, 2^1 = 2, 2^2 = 4 (day 4 should include cards from all buckets)
    assert.strictEqual(resultDay4.size, 3, "Day 4 should include flashcards from all buckets");
    assert.ok(resultDay4.has(card1), "Day 4 should include card1");
    assert.ok(resultDay4.has(card2), "Day 4 should include card2");
    assert.ok(resultDay4.has(card3), "Day 4 should include card3");
  });

  it("should not add flashcards when the day is not divisible by 2^i", () => {
    
    const bucket0 = new Set([card1]);
    const bucket1 = new Set([card2]);
    const bucket2 = new Set([card3]);
    
    const buckets = [bucket0, bucket1, bucket2];

    const resultDay3 = practice(buckets, 3); // 2^0 = 1, 2^1 = 2, 2^2 = 4 (day 3 should not include any cards except for the first bucket)
    assert.strictEqual(resultDay3.size, 1, "Day 3 should include no flashcards excepts from bucket 0");
  });

  it("should handle a single bucket with flashcards correctly", () => {
    const bucket0 = new Set([card1]);
    
    const result = practice([bucket0], 1);
    assert.strictEqual(result.size, 1, "The result should contain one flashcard from the only bucket");
    assert.ok(result.has(card1), "The flashcard should be included in the result");
  });
});


/*
 * Testing strategy for update():
 * 
 * Partitions:
 * - Difficulty: Wrong, Hard, Easy
 * - Current bucket: 0, middle bucket, highest bucket
 * - Target bucket: existing bucket, non-existing bucket
 * - Map structure: 1 bucket, multiple consecutive buckets, multiple non-consecutive buckets
 * - Card location: only card in bucket, one of multiple cards in bucket
 */
describe("update()", () => {
  // Create some sample flashcards to use in testing
  const card1 = new Flashcard("front1", "back1", "hint1", ["tag1"]);
  const card2 = new Flashcard("front2", "back2", "hint2", ["tag2"]);
  const card3 = new Flashcard("front3", "back3", "hint3", ["tag3"]);

  it("handles Wrong difficulty - moves card from any bucket to bucket 0", () => {
    // Setup: card is in bucket 2
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(2, new Set([card2]));
    
    // Action: card2 was answered incorrectly
    const result = update(bucketMap, card2, AnswerDifficulty.Wrong);
    
    // Verification
    assert.strictEqual(result.get(0)?.size, 2, "Bucket 0 should now have 2 cards");
    assert.ok(result.get(0)?.has(card1), "Bucket 0 should still have card1");
    assert.ok(result.get(0)?.has(card2), "Bucket 0 should now have card2");
    assert.strictEqual(result.get(2)?.size, 0, "Bucket 2 should now be empty");
  });

  it("handles Hard difficulty - moves card down one bucket", () => {
    // Setup: card is in bucket 2
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(1, new Set([]));
    bucketMap.set(2, new Set([card2]));
    
    // Action: card2 was answered with difficulty
    const result = update(bucketMap, card2, AnswerDifficulty.Hard);
    
    // Verification
    assert.strictEqual(result.get(0)?.size, 1, "Bucket 0 should be unchanged");
    assert.strictEqual(result.get(1)?.size, 1, "Bucket 1 should now have 1 card");
    assert.ok(result.get(1)?.has(card2), "Bucket 1 should now have card2");
    assert.strictEqual(result.get(2)?.size, 0, "Bucket 2 should now be empty");
  });

  it("handles Hard difficulty - card stays in bucket 0 when already in bucket 0", () => {
    // Setup: card is in bucket 0
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    
    // Action: card1 was answered with difficulty
    const result = update(bucketMap, card1, AnswerDifficulty.Hard);
    
    // Verification
    assert.strictEqual(result.get(0)?.size, 1, "Bucket 0 should still have 1 card");
    assert.ok(result.get(0)?.has(card1), "Bucket 0 should still have card1");
  });

  it("handles Easy difficulty - moves card up one bucket", () => {
    // Setup: card is in bucket 1
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card3]));
    bucketMap.set(1, new Set([card1]));
    bucketMap.set(2, new Set([card2]));
    
    // Action: card1 was answered easily
    const result = update(bucketMap, card1, AnswerDifficulty.Easy);
    
    // Verification
    assert.strictEqual(result.get(0)?.size, 1, "Bucket 0 should be unchanged");
    assert.strictEqual(result.get(1)?.size, 0, "Bucket 1 should now be empty");
    assert.strictEqual(result.get(2)?.size, 2, "Bucket 2 should now have 2 cards");
    assert.ok(result.get(2)?.has(card1), "Bucket 2 should now have card1");
    assert.ok(result.get(2)?.has(card2), "Bucket 2 should still have card2");
  });

  it("handles Easy difficulty - creates new bucket if needed", () => {
    // Setup: card is in the highest bucket
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(1, new Set([card2]));
    
    // Action: card2 was answered easily
    const result = update(bucketMap, card2, AnswerDifficulty.Easy);
    
    // Verification
    assert.strictEqual(result.get(0)?.size, 1, "Bucket 0 should be unchanged");
    assert.strictEqual(result.get(1)?.size, 0, "Bucket 1 should now be empty");
    assert.strictEqual(result.get(2)?.size, 1, "Bucket 2 should now have 1 card");
    assert.ok(result.get(2)?.has(card2), "Bucket 2 should now have card2");
  });

  it("handles Hard difficulty - creates previous bucket if needed", () => {
    // Setup: card is in bucket 2, but bucket 1 doesn't exist
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(2, new Set([card2]));
    
    // Action: card2 was answered with difficulty
    const result = update(bucketMap, card2, AnswerDifficulty.Hard);
    
    // Verification
    assert.strictEqual(result.get(0)?.size, 1, "Bucket 0 should be unchanged");
    assert.strictEqual(result.get(1)?.size, 1, "Bucket 1 should now have 1 card");
    assert.ok(result.get(1)?.has(card2), "Bucket 1 should now have card2");
    assert.strictEqual(result.get(2)?.size, 0, "Bucket 2 should now be empty");
  });

  it("handles multiple cards in a bucket correctly", () => {
    // Setup: multiple cards in bucket 1
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([]));
    bucketMap.set(1, new Set([card1, card2, card3]));
    
    // Action: only card1 was answered easily
    const result = update(bucketMap, card1, AnswerDifficulty.Easy);
    
    // Verification
    assert.strictEqual(result.get(0)?.size, 0, "Bucket 0 should remain empty");
    assert.strictEqual(result.get(1)?.size, 2, "Bucket 1 should now have 2 cards");
    assert.ok(result.get(1)?.has(card2), "Bucket 1 should still have card2");
    assert.ok(result.get(1)?.has(card3), "Bucket 1 should still have card3");
    assert.ok(!result.get(1)?.has(card1), "Bucket 1 should no longer have card1");
    assert.strictEqual(result.get(2)?.size, 1, "Bucket 2 should now have 1 card");
    assert.ok(result.get(2)?.has(card1), "Bucket 2 should now have card1");
  });

  it("handles non-consecutive buckets correctly", () => {
    // Setup: buckets 0, 3, 5 exist
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(3, new Set([card2]));
    bucketMap.set(5, new Set([card3]));
    
    // Action: card3 was answered with difficulty
    const result = update(bucketMap, card3, AnswerDifficulty.Hard);
    
    // Verification
    assert.strictEqual(result.get(0)?.size, 1, "Bucket 0 should be unchanged");
    assert.strictEqual(result.get(3)?.size, 1, "Bucket 3 should be unchanged");
    assert.strictEqual(result.get(4)?.size, 1, "Bucket 4 should now have 1 card");
    assert.ok(result.get(4)?.has(card3), "Bucket 4 should now have card3");
    assert.strictEqual(result.get(5)?.size, 0, "Bucket 5 should now be empty");
  });

  it("handles a card that doesn't exist in any bucket", () => {
    // Setup: card4 isn't in any bucket
    const card4 = new Flashcard("front4", "back4", "hint4", ["tag4"]);
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(1, new Set([card2]));
    bucketMap.set(2, new Set([card3]));
    
    // Make copies to compare after the operation
    const bucket0Before = new Set(bucketMap.get(0));
    const bucket1Before = new Set(bucketMap.get(1));
    const bucket2Before = new Set(bucketMap.get(2));
    
    // Action: trying to update a non-existent card
    const result = update(bucketMap, card4, AnswerDifficulty.Easy);
    
    // Verification - nothing should change
    assert.strictEqual(result.get(0)?.size, bucket0Before.size, "Bucket 0 should be unchanged");
    assert.strictEqual(result.get(1)?.size, bucket1Before.size, "Bucket 1 should be unchanged");
    assert.strictEqual(result.get(2)?.size, bucket2Before.size, "Bucket 2 should be unchanged");
    
    // Check that no new buckets were created
    assert.strictEqual(result.size, 3, "The map should still have 3 buckets");
  });

  it("verifies that the function modifies the input map directly", () => {
    // Setup
    const bucketMap = new Map<number, Set<Flashcard>>();
    bucketMap.set(0, new Set([card1]));
    bucketMap.set(1, new Set([card2]));
    
    // Action
    const result = update(bucketMap, card2, AnswerDifficulty.Easy);
    
    // Verification
    assert.strictEqual(result, bucketMap, 
      "The function should return the same map instance it was given");
    
    // Verify the original map was modified
    assert.strictEqual(bucketMap.get(1)?.size, 0, "Original map's bucket 1 should be empty");
    assert.strictEqual(bucketMap.get(2)?.size, 1, "Original map's bucket 2 should have 1 card");
    assert.ok(bucketMap.get(2)?.has(card2), "Original map's bucket 2 should have card2");
  });
});

/*
 * Testing strategy for getHint():
 *
 * TODO: Describe your testing strategy for getHint() here.
 */
describe("getHint()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for computeProgress():
 *
 * TODO: Describe your testing strategy for computeProgress() here.
 */
describe("computeProgress()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});