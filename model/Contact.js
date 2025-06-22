import mongoose from "mongoose";

const contractSchmea = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      default: null,
    },
    email:{
        type:String,
        default:null,
    },
    linkedId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Contact",
        default:null,
        
    },
     linkPrecedence: {
        type:String,
        enums:["primary", "secondary"],
        default:"primary"
    },
    deleteAt: {
        type:Date,
        default:null
    }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

export const Contact = mongoose.model("Contract", contractSchmea);