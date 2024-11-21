import { Project, Task, User } from "../models/index.js";

const cleanDB = async (): Promise<void> => {
  try {
    await Task.deleteMany({});
    console.log("All Tasks in collection were destroyed by Godzilla!");

    await Project.deleteMany({});
    console.log(
      "All Projects in collection were eridicated by The Black Plague!"
    );

    await User.deleteMany({});
    console.log("All Users were wiped out by dysentary!");
  } catch (err) {
    console.error("Error cleaning your trophy collections:", err);
    process.exit(1);
  }
  console.log("Database cleaned successfully!");
};

export default cleanDB;
