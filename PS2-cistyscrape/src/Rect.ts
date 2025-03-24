/**
 * Problem Set 2: Cityscape - Rect ADT
 *
 * This file defines the Rect abstract data type (ADT) and its specification.
 * You should not need to modify this file.
 */

/**
 * Represents a 2D rectangle on a grid.
 * Rectangles are immutable.
 *
 * x1, y1 is the top-left corner, and x2, y2 is the bottom-right corner.
 * Rectangles include all points (x, y) such that x1 <= x < x2 and y1 <= y < y2.
 */
export class Rect {
  /**
   * Make a new rectangle.
   * @param x1 x-coordinate of top-left corner
   * @param y1 y-coordinate of top-left corner
   * @param x2 x-coordinate of bottom-right corner (exclusive)
   * @param y2 y-coordinate of bottom-right corner (exclusive)
   * @spec.requires x1, y1, x2, y2 are integers
   *                x1 <= x2 and y1 <= y2
   */
  constructor(
    public readonly x1: number,
    public readonly y1: number,
    public readonly x2: number,
    public readonly y2: number
  ) {
    // You may add assertions here to check the spec.requires clause, if desired.
  }

  /**
   * Get the width of the rectangle.
   * @returns width in grid units, must be non-negative
   */
  get width(): number {
    return this.x2 - this.x1;
  }

  /**
   * Get the height of the rectangle.
   * @returns height in grid units, must be non-negative
   */
  get height(): number {
    return this.y2 - this.y1;
  }

  /**
   * Get the area of the rectangle.
   * @returns area in grid units, must be non-negative
   */
  get area(): number {
    return this.width * this.height;
  }

  /**
   * Convert rectangle to a string representation, for debugging purposes.
   * Not part of the specification of Rect, may return any string.
   */
  toString(): string {
    return `Rect(${this.x1},${this.y1}-${this.x2},${this.y2})`;
  }
}
