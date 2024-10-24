// Be careful about changing this!

import { Schema, model, Document } from "mongoose";
import { ITask } from "./Task.js";

interface IProject extends Document {
  name: string;
  description: string;
  tasks: ITask[];
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Project = model<IProject>("Project", projectSchema);

export default Project;
export { IProject, projectSchema };
