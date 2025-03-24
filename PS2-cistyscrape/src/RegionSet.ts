/**
 * Problem Set 2: Cityscape - RegionSet ADT
 *
 * This file defines the RegionSet abstract data type (ADT) and its specification.
 * You will implement the RegionSet ADT in RegionSetImpl.ts.
 */

import { Rect } from "./Rect";

/**
 * Represents a mutable set of contiguous, uniquely-labeled regions on a 2D grid.
 *
 * Regions in a region set are contiguous, meaning that every cell in a region
 * is reachable from every other cell in the same region by moving up, down, left, or right
 * without leaving the region.
 *
 * Regions in a region set are uniquely labeled, meaning that no two regions in the set
 * can have the same label.
 *
 * Regions in a region set are non-overlapping, meaning that no two regions in the set
 * can contain the same cell.
 *
 * RegionSet is a mutable ADT.
 *
 * @param <L> label type for regions in the set.
 */
export interface RegionSet<L> {
  /**
   * Get the size of the grid.
   * @returns the grid size (both width and height)
   */
  readonly gridSize: number;

  /**
   * Get all the labels currently used in the region set.
   * @returns a set of all labels in the region set.
   */
  labels(): Set<L>;

  /**
   * Get the region associated with a label.
   * @param label label to find
   * @returns a copy of the Rects forming the region with label,
   *          or undefined if no region with that label exists.
   */
  getRegion(label: L): Set<Rect> | undefined;

  /**
   * Add a new region to the region set.
   * @param label label for the new region, must not already exist in the region set
   * @param rects rectangles forming the new region. Must be contiguous and non-overlapping.
   *        Rectangles must be within the grid boundaries (0 <= x < gridSize, 0 <= y < gridSize).
   *        Rectangles must not overlap with any existing region in the region set.
   * @throws Error if label is already in the region set, or if rects are invalid
   *         (e.g. overlapping, disconnected, or overlapping existing regions).
   * @modifies this region set
   * @effects adds a new region to the region set with the given label and rectangles.
   */
  add(label: L, rects: Iterable<Rect>): void;

  /**
   * Remove a region from the region set.
   * @param label label of the region to remove
   * @returns true if the region was removed, false if it was not in the region set.
   * @modifies this region set
   * @effects removes the region with the given label from the region set, if it exists.
   */
  remove(label: L): boolean;

  /**
   * Convert region set to a string representation, for debugging purposes.
   * Not part of the specification of RegionSet, may return any string.
   */
  toString(): string;
}

/**
 * Make an empty RegionSet of the given size.
 * @param gridSize number of rows and columns in the grid. Must be positive.
 * @returns a new empty RegionSet with no regions.
 */
export function makeRegionSet<L>(gridSize: number): RegionSet<L> {
  // Replace with your chosen implementation of RegionSet
  throw new Error("Not implemented yet");
}
