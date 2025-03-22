import ProjectCard from "./ProjectCard.tsx";
const projectsData = [
  {
    id: 1,
    title: "Vue Ad Block Detect",
    description: "An adblock detect mixin for Vue.js",
    repo: "vue-adblock-detect",
    url: "https://github.com/azs06/vue-adblock-detect",
    tags: ["Vue"],
    stars: 6,
  },
  {
    id: 2,
    title: "Prayer Time Bd",
    description: "A Cli application to get prayer times on terminal",
    url: "https://github.com/azs06/prayer-time-bd",
    repo: "prayer-time-bd",
    tags: ["Node.js", "JavaScript"],
    stars: 0,
  },
  {
    id: 3,
    title: "Prayer Time API",
    description:
      "An api created from the permanent prayer calendar provided by Bangladesh Islamic Foundation",
    url: "https://github.com/azs06/prayer-time-api",
    repo: "prayer-time-api",
    tags: ["Node.js", "JavaScript", "Express.js"],
    stars: 0,
  },
  {
    id: 4,
    title: "To Watch CLI",
    description:
      "A command line application developed using Node.js, to keep track to things to watch for later",
    url: "https://github.com/azs06/towatch-cli",
    repo: "towatch-cli",
    tags: ["Node.js", "JavaScript"],
    stars: 0,
  },
  {
    id: 5,
    title: "Svelte Lightbox",
    description:
      "A lightbox created using tailwind to be used on svelte projects",
    url: "https://github.com/azs06/svelte-lightbox",
    repo: "svelte-lightbox",
    tags: ["Node.js", "Svelte"],
    stars: 0,
  },
  {
    id: 6,
    title: "11ty WordPress Starter Kit",
    description:
      "A starter kit to develop jamstack website using WordPress Graphql and 11ty",
    url: "https://github.com/azs06/11ty-wp-starter-kit",
    repo: "11ty-wp-starter-kit",
    tags: ["Node.js", "Svelte"],
    stars: 0,
  },
  {
    id: 7,
    title: "Skipper Organisms",
    description:
      "A collection of web components, created as part of the Skipper UI library",
    url: "https://github.com/Skipper-Hospitality/organisms",
    repo: "Skipper-Hospitality/organisms",
    tags: ["Webcomponent", "Typescript", "Node.js"],
    stars: 2,
  },
  {
    id: 8,
    title: "Learning Notes",
    description:
      "A collection of notes, converted to an web app using VitePress",
    url: "https://github.com/azs06/learning-notes",
    repo: "learning-notes",
    tags: ["vue", "markdown"],
    stars: 0,
  },
  {
    id: 9,
    title: "Blog Template",
    description: "Personal blog created using Vitepress",
    url: "https://github.com/azs06/blog-template",
    repo: "blog-template",
    tags: ["vue", "markdown"],
    stars: 0,
  },
  {
    id: 10,
    title: "Github Streak Viewer",
    description: "A Node.js application to display Github streak using graphql",
    url: "https://github.com/azs06/github-streak-viewer",
    repo: "github-streak-viewer",
    tags: ["express", "node.js", "graphql"]
  }
];

export const Projects = ({ githubRepos = [] }) => {
  // Merge GitHub star count from the fetched repos data into the local projects data
  const updatedProjects = projectsData.map((project) => {
    const projectRepo = githubRepos.find((r) => r.name === project.repo);
    return projectRepo
      ? { ...project, stars: projectRepo.stargazers_count }
      : project;
  });

  return (
    <div className="my-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {updatedProjects.map((project) => (
        <div
          key={`${project.id}-${project.stars}-${project.title}`}
          className="border border-gray-200 rounded-lg p-4 bg-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};
