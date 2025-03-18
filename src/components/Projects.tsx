import React, { useEffect, useState } from "react";
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
];

// Configuration
const github_username = "azs06";
const githubToken = import.meta.env.PUBLIC_GITHUB_API_TOKEN; // Ensure this env variable is defined in your project
const CACHE_KEY = "github_repos_cache";
const CACHE_EXPIRATION_HOURS = 24;


export const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [computedProjects, setComputedProjects] = useState(projectsData);

  const headers = {
    Authorization: `token ${githubToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  // Helper: Check if cached data is still valid
  const isCacheValid = (timestamp: EpochTimeStamp) => {
    const now = new Date().getTime();
    return now - timestamp < CACHE_EXPIRATION_HOURS * 60 * 60 * 1000;
  };

  // Fetch repositories from GitHub with caching in localStorage
  const fetchRepos = async (username: string) => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { timestamp, repos } = JSON.parse(cachedData);
        if (isCacheValid(timestamp)) {
          return repos;
        }
      }
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        { headers }
      );
      if (!response.ok) throw new Error("Failed to fetch repositories");
      const repos = await response.json();

      // Cache data with current timestamp
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: new Date().getTime(), repos })
      );
      return repos;
    } catch (error) {
      console.error("Error fetching repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  // On component mount, fetch repos and merge star counts into local projects
  useEffect(() => {
    const updateProjects = async () => {
      const repos = await fetchRepos(github_username);
      if (repos) {
        const updatedProjects = computedProjects.map((project) => {
          // Match local project by repo name (assumes a `repo` property exists)
          const projectRepo = repos.find((r) => r.name === project.repo);
          return projectRepo
            ? { ...project, stars: projectRepo.stargazers_count }
            : project;
        });
        setComputedProjects(updatedProjects);
      }
    };

    updateProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {computedProjects.map((project) => (
        <div
          key={`${project.id}-${project.stars}-${project.title}`}
          className="border border-gray-200 rounded-lg p-4 bg-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <ProjectCard project={project} />
        </div>
      ))}
      {loading && (
        <div className="text-center text-gray-500 mt-4 col-span-full">
          Loading projects...
        </div>
      )}
    </div>
  );
};
