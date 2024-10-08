import mongoose, { Schema, model, Document} from "mongoose";
import { ITask, taskSchema} from "./Task.js";
import { IUser, userSchema } from "./User.js";

interface IProject extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  members: IUser[];
  createdAt: Date;
  tasks: ITask[];
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [userSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [taskSchema],
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
