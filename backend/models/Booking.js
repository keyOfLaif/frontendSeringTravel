import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userBooking: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    tripBooked: {
      type: mongoose.Types.ObjectId,
      ref: 'Schedule',
    },

    noBooking: {
      type: String,
      required: true,
    },

    participantCount: {
      type: Number,
      required: true,
    },

    participants:[{
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
      },
    }
    ],

    dp: {
      type: Boolean,
      default: false,
    },
    
    fullPayment: {
      type: Boolean,
      default: false
    },

    paymentProofs:{
      dp : { type : String},
      fullPayment : {type : String},
    },

    paymentStatus: {
      type: String,
      enum: ['menunggu pembayaran', 'menunggu konfirmasi','dp terbayar', 'lunas'],
      default: 'menunggu pembayaran',
    },

    bookingExpiration: {
      type: Date,
    },
  },
  { timestamps: true }
);

bookingSchema.pre('save', function (next) {
  // Jika batas waktu belum diatur, set batas waktu menjadi 3 jam dari waktu pembuatan booking
  if (!this.bookingExpiration) {
    this.bookingExpiration = new Date(this.createdAt.getTime() + 3 * 60 * 60 * 1000);
  }

  next();
});

export default mongoose.model("Booking", bookingSchema);
