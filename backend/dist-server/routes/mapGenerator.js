"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mapGeneration = require("../models/maps/mapGeneration");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* 
    TODO:
    Add optional query for specifying map size
*/

var router = _express["default"].Router();
router.get("/", function (req, res, next) {
  var generator = new _mapGeneration.MapGenerator(32, 32);
  var map = generator.seedNoiseMap(0.5);
  map = generator.applyCellularAutomaton(map, 4);
  res.send(map);
});
var _default = router;
exports["default"] = _default;