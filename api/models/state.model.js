import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    stateCode: {
      type: String,
      required: true,
    },
    stateName: {
      type: String,
      required: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
  },
  { timestamps: true }
);

const State = mongoose.model("State", stateSchema);

export default State;
