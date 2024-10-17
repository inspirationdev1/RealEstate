import City from "../models/city.model.js";
import { errorHandler } from "../utils/error.js";

// import fs from require("fs");
// import path from require("path");

export const createCity = async (req, res, next) => {
  try {
    const city = await City.create(req.body);
    return res.status(201).json(city);
  } catch (error) {
    next(error);
  }
};

export const deleteCity = async (req, res, next) => {
  const city = await City.findById(req.params.id);

  if (!city) {
    return next(errorHandler(404, "City not found!"));
  }

  try {
    await City.findByIdAndDelete(req.params.id);
    res.status(200).json("City has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateCity = async (req, res, next) => {
  const city = await City.findById(req.params.id);
  if (!city) {
    return next(errorHandler(404, "City not found!"));
  }

  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedCity);
  } catch (error) {
    next(error);
  }
};

export const getCity = async (req, res, next) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return next(errorHandler(404, "City not found"));
    }
    res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};

export const getCities = async (req, res, next) => {
  try {
    const cities = await City.find({}).sort().limit().skip();

    return res.status(200).json(cities);
  } catch (error) {
    next(error);
  }
};

export const getCityByState = async (req, res, next) => {
  try {
    console.log("req.params.stateId", req.params.id);
    // let _id = mongoose.Types.ObjectId(req.params.id);
    // const city = await City.findById(req.params.id);
    // let params = req.body;
    const city = await City.find({ stateId: req.params.id });
    // const listings = await Listing.find({ userRef: req.params.id });
    // console.log("city", city);
    if (!city) {
      return next(errorHandler(404, "City not found"));
    }
    res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};
