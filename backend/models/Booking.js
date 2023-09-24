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

    participantCount: {
      type: Number,
      required: true,
    },

    participants:[{
      name : {
        type:String,
        default:'',
      },
      email : {
        type:String,
        default:'',
      },
      phone : {
        type:String,
        default:''
      },
      city : {
        type:String,
        default:''
      },
      gender : {
        type:String,
        default:''
      },
      job : {
        type:String,
        default:''
      },
      birthDay : {
        type:Date,
        default:null
      },
    }
    ],

    dp: {
      type: Number,
      default: 0
    },
    
    fullPayment: {
      type: Number,
      default: 0
    },

    paymentProofs:{
      dp : { type : String, default: ''},
      fullPayment : {type : String, default:''},
    },

    paymentStatus: {
      type: String,
      enum: ['menunggu pembayaran', 'menunggu konfirmasi dp','dp terbayar', 'menunggu konfirmasi pelunasan','lunas'],
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
