const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
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
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invalid email");
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("age must be a positive number");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length <= 6)
          throw new Error("password must be more than 6 chars");
        if (value.toLowerCase().includes("password"))
          throw new Error('password may not contain "password"');
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const publicProfile = user.toObject();

  delete publicProfile.password;
  delete publicProfile.tokens;
  delete publicProfile.avatar;

  return publicProfile;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id.toString() }, "thisismynewcourse");

  user.tokens.push({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Unable to login");

  const isVerified = await bcrypt.compare(password, user.password);

  if (!isVerified) throw new Error("Unable to login");

  return user;
};

// Hash the plain text user password before save
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when a user is deleted
userSchema.pre("remove", async function (next) {
  const user = this;

  const tasks = await Task.deleteMany({ owner: user._id });
  console.log("deleted tasks:", tasks);
  next();
});

const User = mongoose.model("User", userSchema);
User.createIndexes();

module.exports = User;
