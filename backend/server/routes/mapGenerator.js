import express from "express"
const router = express.Router()

router.get("/", (req, res, next) => {
  res.send('map json')
})

export default router