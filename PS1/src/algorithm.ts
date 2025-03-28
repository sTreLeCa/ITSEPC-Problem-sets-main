/**
 * Problem Set 1: Flashcards - Algorithm Functions
 *
 * This file contains the implementations for the flashcard algorithm functions
 * as described in the problem set handout.
 *
 * Please DO NOT modify the signatures of the exported functions in this file,
 * or you risk failing the autograder.
 */

import { Flashcard, AnswerDifficulty, BucketMap } from "./flashcards";

/**
 * Converts a Map representation of learning buckets into an Array-of-Set representation.
 *
 * @param buckets Map where keys are bucket numbers and values are sets of Flashcards.
 * @returns Array of Sets, where element at index i is the set of flashcards in bucket i.
 *          Buckets with no cards will have empty sets in the array.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
export function toBucketSets(buckets: BucketMap): Array<Set<Flashcard>> {
  const maxBucket = Math.max(...buckets.keys(), 0);
  const result = Array.from({ length: maxBucket}, () => new Set<Flashcard>());
  
  buckets.forEach((flashcards, bucket) => {
    result[bucket] = new Set(flashcards);
  });
  
  return result;
}

/**
 * Finds the range of buckets that contain flashcards, as a rough measure of progress.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @returns object with minBucket and maxBucket properties representing the range,
 *          or undefined if no buckets contain cards.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
export function getBucketRange(
  buckets: Array<Set<Flashcard> | undefined>
): { minBucket: number; maxBucket: number } | undefined {
  let minBucket: number | undefined = undefined;
  let maxBucket: number | undefined = undefined;

  // Loop through all the buckets to find the first and last non-empty buckets
  for (let i = 0; i < buckets.length; i++) {
    const bucket = buckets[i];
    if(bucket !== undefined && bucket.size > 0) {
       minBucket = i;
       break;
    }
  }
  for (let i = buckets.length - 1; i >= 0; i--) {
    const bucket = buckets[i];
    if(bucket !== undefined && bucket.size > 0) {
       maxBucket = i;
       break;
    }
  }

  // If no non-empty buckets were found, return undefined
  if (minBucket === undefined || maxBucket === undefined) {
    return undefined;
  }

  // Return the range of non-empty buckets
  return { minBucket, maxBucket };
}



/**
 * Selects cards to practice on a particular day.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @param day current day number (starting from 0).
 * @returns a Set of Flashcards that should be practiced on day `day`,
 *          according to the Modified-Leitner algorithm.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
export function practice(
  buckets: Array<Set<Flashcard>>,
  day: number
): Set<Flashcard> {
  // TODO: Implement this function

  // Create a new Set to store the flashcards to practice
  const flashcardsToPractice = new Set<Flashcard>();
  for (let i = 0; i < buckets.length; i++) {
    // If the bucket is empty, skip to the next bucket
    if (!buckets[i] || buckets[i]?.size === 0) {
      continue;
    }
    
    if (day % 2**i === 0) {
      buckets[i]?.forEach(flashcard => {
        flashcardsToPractice.add(flashcard);
      });
    }
  }
  return flashcardsToPractice;
}

/**
 * Updates a card's bucket number after a practice trial.
 *
 * @param buckets Map representation of learning buckets.
 * @param card flashcard that was practiced.
 * @param difficulty how well the user did on the card in this practice trial.
 * @returns updated Map of learning buckets.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
export function update(
  buckets: BucketMap,
  card: Flashcard,
  difficulty: AnswerDifficulty
): BucketMap {
  // First find which bucket contains the card
  let sourceBucketIndex: number | null = null;
  
  // Find the bucket containing the card
  for (const [bucketIndex, cardSet] of buckets.entries()) {
    if (cardSet.has(card)) {
      sourceBucketIndex = bucketIndex;
      break; // Stop searching once we find it
    }
  }
  
  // If card wasn't found in any bucket, return the original map unchanged
  if (sourceBucketIndex === null) {
    return buckets;
  }
  
  // Determine the target bucket based on difficulty
  let targetBucketIndex: number;
  
  switch (difficulty) {
    case AnswerDifficulty.Wrong:
      targetBucketIndex = 0; // Always move to bucket 0
      break;
      
    case AnswerDifficulty.Hard:
      targetBucketIndex = Math.max(0, sourceBucketIndex - 1); // Move down one bucket, but not below 0
      break;
      
    case AnswerDifficulty.Easy:
      targetBucketIndex = sourceBucketIndex + 1; // Move up one bucket
      break;
      
    default:
      return buckets; // Return unchanged if difficulty is invalid
  }
  
  // If target and source buckets are the same (e.g., Hard difficulty when already in bucket 0),
  // no need to move anything
  if (targetBucketIndex === sourceBucketIndex) {
    return buckets;
  }
  
  // Remove card from source bucket
  buckets.get(sourceBucketIndex)!.delete(card);
  
  // Create the target bucket if it doesn't exist
  if (!buckets.has(targetBucketIndex)) {
    buckets.set(targetBucketIndex, new Set<Flashcard>());
  }
  
  // Add card to target bucket
  buckets.get(targetBucketIndex)!.add(card);
  
  return buckets;
}


/**
 * Generates a hint for a flashcard.
 *
 * @param card flashcard to hint
 * @returns a hint for the front of the flashcard.
 * @spec.requires card is a valid Flashcard.
 */
export function getHint(card: Flashcard): string {
  // TODO: Implement this function (and strengthen the spec!)
  throw new Error("Implement me!");
}

/**
 * Computes statistics about the user's learning progress.
 *
 * @param buckets representation of learning buckets.
 * @param history representation of user's answer history.
 * @returns statistics about learning progress.
 * @spec.requires [SPEC TO BE DEFINED]
 */
export function computeProgress(buckets: any, history: any): any {
  // Replace 'any' with appropriate types
  // TODO: Implement this function (and define the spec!)
  throw new Error("Implement me!");
}
