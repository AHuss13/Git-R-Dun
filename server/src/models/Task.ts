import { Schema, model, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  status: string;
  projectId: string;
  owner: string;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Done"],
      default: "Not Started",
      required: true,
    },
    owner: {
      type: String,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = model<ITask>("Task", taskSchema);

export default Task;
export { ITask, taskSchema };
