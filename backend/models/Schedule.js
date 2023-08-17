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
    participants: [{
      participantName : {
        type:String
      },
      participantEmail : {
        type:String
      },
      participantPhoneNumber : {
        type:String
      },
      participantCity : {
        type:String
      },
      participantGender : {
        type:String
      },
      participantJob : {
        type:String
      }
    }
    ],
    
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", scheduleSchema);