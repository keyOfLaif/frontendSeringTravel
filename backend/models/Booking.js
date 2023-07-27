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
    },

    bookersDetail: [
      {
        name: {
          type: String,
        },
        city: {
          type: String,
        },
        gender: {
          type: String,
        },
      },
    ],

    bookingStatus: {
      type: Number,
      default: 0,
    },

    paymentSign: {
      type: String
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
    this.bookingExpiration = moment(this.createdAt).add(3, 'hours');
  }

  next();
});

export default mongoose.model("Booking", bookingSchema);
