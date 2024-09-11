const db = require("../config/connection");
const { User, Project } = require("../models");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");
const projectSeeds = require("./projectSeeds.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    
    await cleanDB("Project", "projects");

    await User.create(userSeeds);

    for (let i = 0; i < projectSeeds.length; i++) {
      const { _id, owner } = await Project.create(projectSeeds[i]);
      const user = await User.findOneAndUpdate(
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
