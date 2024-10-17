import express from "express";
import {
  createState,
  deleteState,
  updateState,
  getState,
  getStates,
  getStateByCountry,
} from "../controllers/state.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createState);
router.delete("/delete/:id", verifyToken, deleteState);
router.post("/update/:id", verifyToken, updateState);
router.get("/get/:id", getState);
router.get("/get", getStates);
router.get("/getStateByCountry/:id", getStateByCountry);
// router.get('/listings/:id', verifyToken, getUserListings);

export default router;



