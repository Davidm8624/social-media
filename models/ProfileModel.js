const { Mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bio: { type: String, default: "click here to make a bio" },
    social: {
      youtube: { type: string },
      facebook: { type: string },
      twitter: { type: string },
      instagram: { type: string },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema)