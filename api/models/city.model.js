import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    cityCode: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },

    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
  },
  { timestamps: true }
);

const City = mongoose.model("City", citySchema);

export default City;
