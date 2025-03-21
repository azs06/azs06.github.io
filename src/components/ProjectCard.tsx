const ProjectCard = ({ project }) => {
  const stars = project?.stars;
  const displayStars = stars > 0 ? `⭐ ${stars}` : "";

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold leading-tight">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      {project.description && (
        <p className="my-2 text-sm leading-relaxed text-gray-700">
          {project.description}
        </p>
      )}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
          {stars > 0 && <span className="text-sm">{displayStars}</span>}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
