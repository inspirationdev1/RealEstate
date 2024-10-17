import Country from "../models/country.model.js";
import { errorHandler } from "../utils/error.js";

// import fs from require("fs");
// import path from require("path");

export const createCountry = async (req, res, next) => {
  try {
    const country = await Country.create(req.body);
    return res.status(201).json(country);
  } catch (error) {
    next(error);
  }
};

export const deleteCountry = async (req, res, next) => {
  const country = await Country.findById(req.params.id);

  if (!country) {
    return next(errorHandler(404, "Country not found!"));
  }
  // if (req.user.id !== country.userRef) {
  //   return next(errorHandler(404, "You can delete your own country!"));
  // }
  try {
    await Country.findByIdAndDelete(req.params.id);
    res.status(200).json("Country has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateCountry = async (req, res, next) => {
  const country = await Country.findById(req.params.id);
  if (!country) {
    return next(errorHandler(404, "Country not found!"));
  }
  // if (req.user.id !== country.userRef) {
  //   return next(errorHandler(401, "You can only update your own countries!"));
  // }

  try {
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCountry);
  } catch (error) {
    next(error);
  }
};

export const getCountry = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return next(errorHandler(404, "Country not found"));
    }
    res.status(200).json(country);
  } catch (error) {
    next(error);
  }
};

export const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.find({})
      .sort()
      .limit()
      .skip();

    return res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};
