"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapGenerator = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// import { Graphics, DisplayObject } from "pixi.js";
var MapGenerator = /*#__PURE__*/function () {
  function MapGenerator(mapWidth, mapHeight) {
    _classCallCheck(this, MapGenerator);
    this.mapWidth = mapWidth; // In tiles
    this.mapHeight = mapHeight; // in tiles
    this.floorTile = 0;
    this.wallTile = 1;
    this.cellularAutomatonCount = 4;
    this.wallCountThreshold = 4;
  }
  _createClass(MapGenerator, [{
    key: "seedNoiseMap",
    value: function seedNoiseMap(buildableDensity) {
      /*   
        args:
          buildableDensity: specifies whether an element will be 'buildable' or not. Treat as percentage.
        returns:
          noiseMap to act as a seed for cellular automaton
          for creating the initial map on which to build 
      */

      // Create 2D array[height[row]]
      var noiseMap = [];
      // Cycle through the array to create a random noise map
      for (var height = 0; height < this.mapHeight; height++) {
        noiseMap.push([]);
        for (var width = 0; width < this.mapWidth; width++) {
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
  }, {
    key: "applyCellularAutomaton",
    value: function applyCellularAutomaton(map) {
      /*
        args:
          grid - the incoming noise map
          count - number of times to loop through the cellular automaton algorithm
        returns:
          smoothed map for populating
      */
      // console.log(_.cloneDeep(map));
      for (var runCount = 0; runCount < this.cellularAutomatonCount; runCount++) {
        var neighbourWallCount = void 0;
        for (var passes = 0; passes < this.cellularAutomatonCount; passes++) {
          var tempMap = _lodash["default"].cloneDeep(map); // To not work use noiseMap as both input and output
          // let p = [...grid.map(x => [...x])]
          for (var heightSearch = 0; heightSearch < this.mapHeight; heightSearch++) {
            for (var widthSearch = 0; widthSearch < this.mapWidth; widthSearch++) {
              neighbourWallCount = 0;
              for (var heightBounds = heightSearch - 1; heightBounds <= heightSearch + 1; heightBounds++) {
                for (var widthBounds = widthSearch - 1; widthBounds <= widthSearch + 1; widthBounds++) {
                  if (this.checkMapBoundary(heightBounds, widthBounds)) {
                    // Check if search item is not equal to the current cell
                    if (heightBounds != heightSearch || widthBounds != widthSearch) {
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
  }, {
    key: "checkMapBoundary",
    value: function checkMapBoundary(heightBounds, widthBounds) {
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
  }, {
    key: "growMapVertically",
    value: function growMapVertically(side, currentMap) {
      var newMap = _lodash["default"].cloneDeep(currentMap);
      var newRow = Array(currentMap[0].length).fill(this.wallTile);
      if (side === "top") {
        newMap.unshift(newRow);
      }
      if (side === "bottom") {
        newMap.push(newRow);
      }
      return newMap;
    }
  }]);
  return MapGenerator;
}();
exports.MapGenerator = MapGenerator;