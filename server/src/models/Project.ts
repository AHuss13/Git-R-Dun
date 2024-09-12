import { Schema, model } from "mongoose";
import dateFormat from "../utils/dateFormat";

const projectSchema: Schema = new Schema({
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
    get: function(this: { _id: any }, timestamp: Date) {
      return dateFormat(timestamp.getTime());
    },
  },
});

const Project = model("Project", projectSchema);

projectSchema.virtual("id").get(function () {
  return this._id!.toString();
});

export default Project;
