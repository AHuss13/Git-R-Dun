import { Schema, model, Document } from "mongoose";
import { IUser } from './User'; // Add this import at the top of the file
interface ITask extends Document {
  name: string;
  status: string;
  projectId: string;
  owner: IUser;
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
