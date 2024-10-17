import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    countryCode: {
      type: String,
      required: true,
    },
    countryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;
