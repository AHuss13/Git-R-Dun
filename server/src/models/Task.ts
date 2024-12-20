import { Schema, model, Document } from "mongoose";

interface ITask extends Document {
  name: string;
  status: string;
  project: Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
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
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

const Task = model<ITask>("Task", taskSchema);

export default Task;
export { ITask, taskSchema };
