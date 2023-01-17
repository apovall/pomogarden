/* 
    TODO:
    Add optional query for specifying map size
*/

import express from "express"
import { MapGenerator } from "../models/maps/mapGeneration"
const router = express.Router()

router.get("/", (req, res, next) => {
  let generator = new MapGenerator(32, 32)
  let map = generator.seedNoiseMap(0.5)
  map = generator.applyCellularAutomaton(map, 4)
  res.send(map)
})

export default router