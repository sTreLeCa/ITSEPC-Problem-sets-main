/**
 * Problem Set 2: Cityscape - City ADT
 *
 * This file defines the City abstract data type (ADT) and its specification.
 * You will implement the City ADT in CityImpl.ts.
 */

import { RegionSet } from "./RegionSet";

/**
 * Represents a mutable set of uniquely-labeled buildings in 3D space.
 * Each building floor is a contiguous region, and buildings do not intersect.
 *
 * Implementation note: City<L> must use RegionSet<FloorLabel<L>> in its rep,
 * and must use makeRegionSet() to create RegionSet instances,
 * so that different RegionSet implementations can be swapped in and out.
 *
 * @param <L> label type for buildings in the city.
 */
export interface City<L> {
  /**
   * Get the dimensions of the city grid.
   * @returns the grid size (both width and height)
   */
  readonly gridSize: number;

  /**
   * Get all the labels currently used in the city.
   * @returns a set of all building labels in the city.
   */
  labels(): Set<L>;

  /**
   * Add a new building to the city.
   * @param buildingLabel label for the new building, must not already exist in the city
   * @param floors a set of 2D regions representing the floors of the building.
   *        Each region in floors must be contiguous and non-overlapping within floors,
   *        and must not overlap with any existing building in the city.
   * @throws Error if buildingLabel is already in the city, or if floors are invalid
   *         (e.g. overlapping, disconnected, or overlapping existing buildings).
   * @modifies this city
   * @effects adds a new building to the city with the given label and floors.
   */
  addBuilding(buildingLabel: L, floors: RegionSet<FloorLabel<L>>): void;

  /**
   * Get the floors of a building in the city.
   * @param buildingLabel label of the building
   * @returns a copy of the RegionSet representing the floors of the building,
   *          or undefined if the building is not found in the city.
   */
  getBuilding(buildingLabel: L): RegionSet<FloorLabel<L>> | undefined;

  /**
   * Remove a building from the city.
   * @param buildingLabel label of the building to remove
   * @returns true if the building was removed, false if it was not in the city.
   * @modifies this city
   * @effects removes the building with the given label from the city, if it exists.
   */
  removeBuilding(buildingLabel: L): boolean;

  /**
   * Convert city to a string representation, for debugging purposes.
   * Not part of the specification of City, may return any string.
   */
  toString(): string;
}

/**
 * Represents a label for a floor in a building.
 * Floor labels are used internally by the City ADT to distinguish floors within a building.
 * Clients of City ADT do not need to create or interpret FloorLabel values.
 */
export type FloorLabel<BuildingLabel> = {
  building: BuildingLabel;
  floor: number;
};

/**
 * Make an empty City of the given size.
 * @param gridSize number of rows and columns in the city grid. Must be positive.
 * @returns a new empty City with no buildings.
 */
export function makeCity<L>(gridSize: number): City<L> {
  // Replace with your chosen implementation of City
  throw new Error("Not implemented yet");
}
