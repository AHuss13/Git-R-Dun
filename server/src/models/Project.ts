// Be careful about changing this!

import { Schema, model, Document } from "mongoose";
import { ITask, taskSchema } from "./Task.js";

interface IProject extends Document {
  name: string;
  description: string;
  owner: Schema.Types.ObjectId;
  tasks: ITask[];
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [taskSchema],
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
export { IProject, projectSchema };
