import db from "../config/connection";
import { User, Project } from "../models";
import userSeeds from "./userSeeds.json";
import cleanDB from './cleanDB';
import projectSeeds from "./projectSeeds.json";

interface ProjectSeed {
  _id: string;
  owner: string;
}

db.once("open", async () => {
  try {
    await cleanDB("User", "users");

    await cleanDB("Project", "projects");

    await User.create(userSeeds);

    for (let i = 0; i < projectSeeds.length; i++) {
      const { _id, owner } = await Project.create(projectSeeds[i] as ProjectSeed);
      await User.findOneAndUpdate(
        { username: owner },
        {
          $addToSet: {
            projects: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
