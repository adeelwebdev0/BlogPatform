import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

/* =========================
   USER INTERFACE
========================= */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

/* =========================
   SCHEMA
========================= */
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

/* =========================
   PASSWORD HASHING (MODERN WAY)
   - NO next()
   - FULL async/await style
========================= */
userSchema.pre("save", async function () {
  // only hash if password is modified
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* =========================
   COMPARE PASSWORD METHOD
========================= */
userSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
