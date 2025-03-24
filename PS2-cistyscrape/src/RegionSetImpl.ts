import { Rect } from "./Rect";
import { RegionSet } from "./RegionSet";

/**
 * Implementations of RegionSet ADT.
 *
 * Choose one of these implementations to use for your makeRegionSet() factory function
 * in RegionSet.ts. You can switch implementations easily by changing that one line.
 *
 * These implementations are also used by the test suite in RegionSetTest.ts,
 * which runs all its tests against all implementations discovered by the implementations()
 * function below.
 */

/**
 * Implementation of RegionSet using a Map to store regions.
 *
 * For Problem 2.
 */
export class RepMapRegionSet<L> implements RegionSet<L> {
  private readonly map: Map<L, Array<Rect>> = new Map();
  public readonly gridSize: number; // declared as a parameter property of the constructor

  // Abstraction function:
  // AF(map, gridSize) = ... (TODO: write your abstraction function here)
  // Representation invariant:
  // RI(map, gridSize) = ... (TODO: write your rep invariant here)
  // Rep exposure safety:
  // ... (TODO: write your rep exposure safety argument here)

  private checkRep(): void {
    // ... (TODO: implement checkRep)
  }

  /**
   * Make a new empty RegionSet.
   * @param gridSize number of rows and columns in the grid. Must be positive.
   */
  constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.checkRep();
  }

  /** @inheritdoc */
  public labels(): Set<L> {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }

  /** @inheritdoc */
  public getRegion(label: L): Set<Rect> | undefined {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }

  /** @inheritdoc */
  public add(label: L, rects: Iterable<Rect>): void {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }

  /** @inheritdoc */
  public remove(label: L): boolean {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }

  /** @inheritdoc */
  public toString(): string {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }
}

/**
 * Implementation of RegionSet using a 2D array to store regions.
 *
 * For Problem 3.
 */
export class RepArrayRegionSet<L> implements RegionSet<L> {
  private readonly array: Array<L | undefined> = [];
  public readonly gridSize: number; // declared as a parameter property of the constructor

  // Abstraction function:
  // AF(array, gridSize) = ... (TODO: write your abstraction function here)
  // Representation invariant:
  // RI(array, gridSize) = ... (TODO: write your rep invariant here)
  // Rep exposure safety:
  // ... (TODO: write your rep exposure safety argument here)

  private checkRep(): void {
    // ... (TODO: implement checkRep)
  }

  constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.checkRep();
  }

  /** @inheritdoc */
  public labels(): Set<L> {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }

  /** @inheritdoc */
  public getRegion(label: L): Set<Rect> | undefined {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }

  /** @inheritdoc */
  public add(label: L, rects: Iterable<Rect>): void {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }

  /** @inheritdoc */
  public remove(label: L): boolean {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }

  /** @inheritdoc */
  public toString(): string {
    throw new Error("Method not implemented."); // remove this line when you implement the method
  }
}

/**
 * Get a list of all implementations of RegionSet that should be tested.
 * Used by RegionSetTest.ts to run the same tests on all implementations.
 */
export function implementations(): Array<
  new (gridSize: number) => RegionSet<string>
> {
  return [
    RepMapRegionSet, // Problem 2
    RepArrayRegionSet, // Problem 3
  ];
}

// You'll need to modify makeRegionSet in RegionSet.ts
// to return an instance of one of these classes.
