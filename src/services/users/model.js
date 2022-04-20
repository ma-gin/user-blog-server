import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  const pass = this.password

  if (this.isModified("password")) {
    const hash = await bcrypt.hash(pass, 10)
    this.password = hash
  }

  next()
})

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject()

  delete userObject.password
  delete userObject.__v

  return userObject
}

UserSchema.statics.checkCredentials = async function (email, plainPassword) {
  // Given email and plain password this method should check if email exists in database, then compare plain password with the hashed one
  // 1. Find the user by email

  const user = await this.findOne({ email }) // "this" here refers to the UserModel

  if (user) {
    // 2. If user is found --> compare plainPW with the hashed one
    const isMatch = await bcrypt.compare(plainPassword, user.password)

    if (isMatch) {
      // 3. If they do match --> return a proper response (user himself)
      return user
    } else {
      // 4. If they don't --> return null
      return null
    }
  } else {
    // 5. If email is not found --> return null
    return null
  }
}
export default model("User", UserSchema)
