import express from "express";
import {
  createCity,
  deleteCity,
  updateCity,
  getCity,
  getCities,
  getCityByState,

} from "../controllers/city.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createCity);
router.delete("/delete/:id", verifyToken, deleteCity);
router.post("/update/:id", verifyToken, updateCity);
router.get("/get/:id", getCity);
router.get("/get", getCities);
router.get("/getCityByState/:id", getCityByState);
export default router;
