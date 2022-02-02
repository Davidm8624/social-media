const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bio: { type: String, default: "click here to make a bio" },
    social: {
      youtube: { type: String },
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema)