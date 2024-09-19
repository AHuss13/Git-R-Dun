import { Project, User } from "../models/index.js";

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from THought collection
    await Project.deleteMany({});
    console.log('All Projects in collection were eridicated by The Black Plague!');

    // Delete documents from User collection
    await User.deleteMany({});
    console.log('Users were wiped out by dysentary!');

  } catch (err) {
    console.error('Error cleaning your trophy collections:', err);
    process.exit(1);
  }
};

export default cleanDB;