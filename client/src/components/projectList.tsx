interface Project {
  _id: string;
  name: string;
  description: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  if (!projects.length) {
    return <h3>No Projects Yet</h3>;
  }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <div key={project._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {project.name}
            </h4>
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <p>{project.description}</p>
            </h4>
          </div>
        ))}
    </div>
  );
};

export default ProjectList;
