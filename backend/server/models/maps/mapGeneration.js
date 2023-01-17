/* 
  Gets hit by API calls relating to map generation, including initial seeding
  returns the initial two dimensional array for seeding the map
  TODO:
    Add optional query for specifying map size

*/

/* 
  Purpose: Module to 
    Generate initial map noise seed
    Generate initial map with multipass cellular automata

*/
import _ from "lodash";
// import { Graphics, DisplayObject } from "pixi.js";

export class MapGenerator {
  constructor(mapWidth, mapHeight) {
    this.mapWidth = mapWidth;     // In tiles
    this.mapHeight = mapHeight;   // in tiles
    this.floorTile = 0;
    this.wallTile = 1;
    this.cellularAutomatonCount = 4;
    this.wallCountThreshold = 4;
  }

  seedNoiseMap(buildableDensity) {
    /*   
      args:
        buildableDensity: specifies whether an element will be 'buildable' or not. Treat as percentage.
      returns:
        noiseMap to act as a seed for cellular automaton
        for creating the initial map on which to build 
    */

    // Create 2D array[height[row]]
    let noiseMap = [];
    // Cycle through the array to create a random noise map
    for (let height = 0; height < this.mapHeight; height++) {
      noiseMap.push([]);
      for (let width = 0; width < this.mapWidth; width++) {
        if (Math.random() <= buildableDensity) {
          noiseMap[height].push(this.floorTile); //Floor tile
        } else {
          noiseMap[height].push(this.wallTile); //Wall tile
        }
      }
    }
    return noiseMap;
  }
  // cellular_automata procedural smoothing (seedMap, passes): map
  applyCellularAutomaton(map){
    /*
      args:
        grid - the incoming noise map
        count - number of times to loop through the cellular automaton algorithm
      returns:
        smoothed map for populating
    */
    // console.log(_.cloneDeep(map));
    for (let runCount = 0; runCount < this.cellularAutomatonCount; runCount++) {
      let neighbourWallCount;

      for (let passes = 0; passes < this.cellularAutomatonCount; passes++) {
        let tempMap = _.cloneDeep(map); // To not work use noiseMap as both input and output
        // let p = [...grid.map(x => [...x])]
        for (
          let heightSearch = 0;
          heightSearch < this.mapHeight;
          heightSearch++
        ) {
          for (
            let widthSearch = 0;
            widthSearch < this.mapWidth;
            widthSearch++
          ) {
            neighbourWallCount = 0;
            for (
              let heightBounds = heightSearch - 1;
              heightBounds <= heightSearch + 1;
              heightBounds++
            ) {
              for (
                let widthBounds = widthSearch - 1;
                widthBounds <= widthSearch + 1;
                widthBounds++
              ) {
                if (this.checkMapBoundary(heightBounds, widthBounds)) {
                  // Check if search item is not equal to the current cell
                  if (
                    heightBounds != heightSearch ||
                    widthBounds != widthSearch
                  ) {
                    if (tempMap[heightBounds][widthBounds] == this.wallTile) {
                      neighbourWallCount++;
                    }
                  }
                } else {
                  neighbourWallCount++;
                }
              }
            }
            if (neighbourWallCount > this.wallCountThreshold) {
              map[heightSearch][widthSearch] = this.wallTile;
            } else {
              map[heightSearch][widthSearch] = this.floorTile;
            }
          }
        }
      }
    }
    // console.log(map);
    return map;
  }

  checkMapBoundary(heightBounds, widthBounds){
    /* 
      Check the upper and lower bounds, to see if they've gone out size of the array
    */

    if (heightBounds <= -1 || heightBounds > this.mapHeight - 1) {
      return false;
    }
    if (widthBounds <= -1 || widthBounds > this.mapWidth - 1) {
      return false;
    }
    return true;
  }

  growMapVertically(side, currentMap) {
    let newMap = _.cloneDeep(currentMap);
    let newRow = Array(currentMap[0].length).fill(this.wallTile);

    if (side === "top") {
      newMap.unshift(newRow);
    }
    if (side === "bottom") {
      newMap.push(newRow);
    }
    return newMap;
  }
}
