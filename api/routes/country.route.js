import express from "express";
import {
  createCountry,
  deleteCountry,
  updateCountry,
  getCountry,
  getCountries,
} from "../controllers/country.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createCountry);
router.delete("/delete/:id", verifyToken, deleteCountry);
router.post("/update/:id", verifyToken, updateCountry);
router.get("/get/:id", getCountry);
router.get("/get", getCountries);

export default router;
