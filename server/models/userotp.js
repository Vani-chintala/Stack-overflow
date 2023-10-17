import mongoose from "mongoose"

const userotpSchema = mongoose.Schema({

    email: {
        type: String,
         required: true
        },
    otp : {
        type:String,
        required : true
    }
    
})

export default mongoose.model("Usersotp",userotpSchema)