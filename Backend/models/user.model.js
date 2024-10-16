import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
  name: {
    type: "String",
    required: true
  },
  email:{
    type:"String",
    unique:true,
    required: true
  },
  password: {
    type:"String",
    required: true
  },
  createdAt: {
    type: "Date",
    default: Date.now,
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
    default: []
  }]
},{timestamp: true})

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Ensure to return next to stop execution
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Ensure password is hashed correctly
  next();
});

const User = mongoose.model("User", UserSchema)

export default User;