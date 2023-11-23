import {model, models, Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  isOAuthUser: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: function() {
      // Make password required only if not an OAuth user
      return !this.isOAuthUser;
    },
    unique: true,
  },
  password: {
    required: function() {
      // Make password required only if not an OAuth user
      return !this.isOAuthUser;
    },
    type: String,
    validate: {
      validator: function (pass) {
        return /^(?=.*\d)(?=.*[A-Z]).{6,}$/.test(pass);
      },
      message: 'Password must be at least 6 characters, include numbers, and contain at least one uppercase letter.'
    }
  },
}, {timestamps: true})

// Hash the password before saving
UserSchema.post("validate", function (user) {
  const pass = user.password;
  user.password = bcrypt.hashSync(pass, 10);
})

export const User = models?.User || model("User", UserSchema)
