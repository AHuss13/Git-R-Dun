const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const projectSchema = new Schema({
  name: {
    type: String,
    required: "You need to name the project!",
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Project = model("Project", projectSchema);

projectSchema.virtual("id").get(function () {
  return this._id.toString();
});

module.exports = Project;
