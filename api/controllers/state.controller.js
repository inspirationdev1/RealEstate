import State from "../models/state.model.js";
import { errorHandler } from "../utils/error.js";
// const mongoose = require("mongoose");
// import fs from require("fs");
// import path from require("path");

export const createState = async (req, res, next) => {
  try {
    const state = await State.create(req.body);
    return res.status(201).json(state);
  } catch (error) {
    next(error);
  }
};

export const deleteState = async (req, res, next) => {
  const state = await State.findById(req.params.id);

  if (!state) {
    return next(errorHandler(404, "State not found!"));
  }

  try {
    await State.findByIdAndDelete(req.params.id);
    res.status(200).json("State has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateState = async (req, res, next) => {
  const state = await State.findById(req.params.id);
  if (!state) {
    return next(errorHandler(404, "State not found!"));
  }

  try {
    const updatedState = await State.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedState);
  } catch (error) {
    next(error);
  }
};

export const getState = async (req, res, next) => {
  try {
    const state = await State.findById(req.params.id);
    if (!state) {
      return next(errorHandler(404, "State not found"));
    }
    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

export const getStates = async (req, res, next) => {
  try {
    const states = await State.find({}).sort().limit().skip();

    return res.status(200).json(states);
  } catch (error) {
    next(error);
  }
};

export const getStateByCountry = async (req, res, next) => {
  try {
    console.log("req.params.countryId", req.params.id);
    // let _id = mongoose.Types.ObjectId(req.params.id);
    // const state = await State.findById(req.params.id);
    // let params = req.body;
    const state = await State.find({ countryId: req.params.id });
    // const listings = await Listing.find({ userRef: req.params.id });
    // console.log("state", state);
    if (!state) {
      return next(errorHandler(404, "State not found"));
    }
    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};
