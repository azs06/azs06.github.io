---
title: MCP Explained
description: What is MCP and how to use it with AI agents
tags: [ai agents, mcp]
pubDate: 'May 27 2025'
heroImage: '/mcp-explained.webp'
---
## What is MCP and how to use it with AI agents

If you follow tech and you have not been living under a rock, you probably have heard of MCP! What is MCP? MCP is an abbreviation of Model Context Protocol. Basically, it's a protocol for AI agents to communicate. It was released by **Anthropic** in November 2024. At first glance it sounds a bit complex, but it’s not, more or less all of us on the tech world are familiar with API(application programming interface), it’s a way for application to communicate with another application, MCP is somewhat similar; it's a protocol that enables AI agents to communicate with your application, server, or whatever you want to plug in to your AI agents.

An MCP server has three primary things:

- Tools
- Resources
- Prompts

These give the MCP server capabilities that the client can utilize.

**Resources:**

Resources represents any kind of data that an MCP server wants to make available to clients. It can be anything:

- Document Files
- Database
- API Responses
- Images
- Log files
- CSV files

and even more

**Prompts:**

We are all aware of Prompts! right? With the rise of AI tools like ChatGPT, we are all familiar with prompts. For the context of MCP, prompts are pre-defined sets of instructions that you configure with your MCP server. Once the client is connected to the MCP server, available prompts can be viewed via the `'prompts/list'` command.

**Tools:**

Tools are the most interesting feature of the MCP, it enables AI agents to solve problems which they previously couldn't. For example if you remember correctly ChatGPT initially did not have updated data from the web, If you add MCP capabilities to ChatGPT like add DuckDuckGo MCP server, then ChatGPT can use DuckDuckGo MCP tools to search the web and give you an updated data regarding anything. MCP server tools give AI agents capabilities that make them even more useful.

To demonstrate MCP, I will create a simple MCP server to handle todo list, the benefit is, we would be able to analyze our data using AI Agents.

- We will use AI agent to add todo item
- We will use AI agent to view todo items
- We will use AI agent to toggle status of items
- We will use AI agent to analyze data

To make things a bit easier, I will use ChatGPT to create todo application using node and sqlite.

Here is the link to the repo for the todo app: https://github.com/azs06/todo-sqlite-api

I will be using VSCode as an MCP client, and I will use bun to run the single file MCP server TypeScript file.

Required npm packages

```tsx

npm i @modelcontextprotocol/sdk, zod --save
npm i @types/node --save-dev
```

```tsx

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

type updateObject = {
  status?: string;
  priority?: string;
};

const apiUrl = "http://localhost:3000";

const server = new McpServer({
  name: "todo-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});
// get all todo items
server.tool("get-todos", "Get all todo items", {}, async () => {
  const response = await fetch(`${apiUrl}/todos`);
  const todos = await response.json();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(todos, null, 2),
      },
    ],
  };
});
// add todo item
server.tool(
  "add-todo",
  "Add a new todo item",
  {
    title: z.string().describe("The title of the todo item"),
    description: z.string().describe("The description of the todo item"),
  },
  async ({ title, description }) => {
    const response = await fetch(`${apiUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, description }),
    });
    const todo = await response.json();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(todo, null, 2),
        },
      ],
    };
  }
);
// delete a todo item
server.tool(
  "delete-todo",
  "Delete a todo item",
  {
    id: z.string().describe("The ID of the todo item to delete"),
  },
  async ({ id }) => {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete todo with ID ${id}`);
    }
    return {
      content: [
        {
          type: "text",
          text: `Todo with ID ${id} deleted successfully.`,
        },
      ],
    };
  }
);

server.tool(
  "update-todo",
  "Update a todo item",
  {
    id: z.string().describe("The ID of the todo item to update"),
    status: z
      .enum(["todo", "completed"])
      .describe("The new status of the todo item"),
    priority: z
      .enum(["low", "medium", "high"])
      .describe("The new priority of the todo item"),
  },
  async ({ id, status, priority }) => {
    const updateObj: updateObject = {};
    if (status) {
      updateObj.status = status;
    }
    if (priority) {
      updateObj.priority = priority;
    }
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    });
    if (!response.ok) {
      throw new Error(`Failed to update todo with ID ${id}`);
    }
    const todo = await response.json();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(todo, null, 2),
        },
      ],
    };
  }
);

server.tool("get-high-priority-todos", "Get high priority todo items", {}, async () => {
  const response = await fetch(`${apiUrl}/todos`);
  const todos = await response.json();
  const highPriorityTodos = todos.filter((todo: any) => todo.priority === "high");
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(highPriorityTodos, null, 2),
      },
    ],
  };
});

async function main() {
    // Create a transport for the server
    const transport = new StdioServerTransport();
    // Start the server
    await server.connect(transport);
    console.log("Server is running. Press Ctrl+C to stop.");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

```

GitHub repo for the MCP Server: https://github.com/azs06/todo-mcp

Now we will add this to our visual studio code as an MCP server. Open settings.json and add this under mcp servers.

```tsx

"todo-mcp": {
  "type": "stdio",
  "command": "bun",
  "args": [
      "/Users/soikat/code/MCP/todo-mcp/src/index.ts"
  ]
}
```

![image.png](https://res.cloudinary.com/theazs/image/upload/v1748353101/personal-website/image_1_jvmbek.png)

Now, if we open the chat panel and select Agent, you will see a reload icon. Click on that.

![image.png](https://res.cloudinary.com/theazs/image/upload/v1748352994/personal-website/image_r4o5zu.png)

Now our todo-mcp server is available within our Agent, and let’s use it.

For the demonstration purpose I have already seeded the db with 50 todo items and manually added a few using [Bruno](https://www.usebruno.com/).

Let’s see the percentage of high priority tasks.

![image.png](https://res.cloudinary.com/theazs/image/upload/v1748353357/personal-website/image_2_emfveg.png)

Let’s see a chart of todo items based on priority.

![image.png](https://res.cloudinary.com/theazs/image/upload/v1748353451/personal-website/image_3_s6yihw.png)

Another interesting thing, let's use the AI agent's thinking ability to get todo items which are personal or family-oriented.

![image.png](https://res.cloudinary.com/theazs/image/upload/v1748353528/personal-website/image_4_kmpx9t.png)

It was smart enough to find out the todo item that is related to my family.

This is a very trivial example, MCP is way more powerful, there are tons of free-to-use MCP servers available already. Here you can find tons of great MCP servers.

https://github.com/punkpeye/awesome-mcp-servers

You can combine multiple MCP servers to do powerful stuff, like use Playwright MCP and combine it with DuckDuckGo MCP to search, open a website, and perform actions on it, or compare different search results and create an analysis based on the result. The possibilities are endless.

**Note:** Notice how we are using the TypeScript SDK to develop the MCP server on stdio (standard input/output). If you are interested in how the underlying technology works, please feel free to check their GitHub repo.

**Final Note:** No AI was use to write this article, but AI was used to review and add correction tho the article. The thumbnail was generated using Gemni pro 2.5 model.
