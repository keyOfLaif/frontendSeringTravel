import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    productIdofTrip: {
      type: mongoose.Types.ObjectId,
      ref: "Trip",
    },
    tripDate:{
      type: Date,
      required: true,
    },
    maxParticipants:{
      type: Number,
      required: true,
    },
    price:{
      type: Number,
      required: true
    },
    participants: [
    ],
    
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", scheduleSchema);