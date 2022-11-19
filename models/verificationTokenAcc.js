
import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const verificationTokenSchema = mongoose.Schema({
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodator",
    required: true,  
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now()
  }
});

// verificationTokenSchema.pre("save", async function(next){
//   if (this.isModified("token")){
//     const hash = await bcrypt.hash(this.token,8)
//     this.token = hash
//   }
//   next()
// })
// verificationTokenSchema.methods.compareToken = async function (token) {
//   const result = bcrypt.compareSync(token,this.token)
//   return result 
// }

verificationTokenSchema.methods.compareToken = async function (token) {
  const result = token === this.token
  return result 
}
export default mongoose.model("VerificationToken", verificationTokenSchema);
