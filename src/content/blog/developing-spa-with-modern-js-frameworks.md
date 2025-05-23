---
title: 'Developing SPA with Modern JS Frameworks'
description: 'An overview of developing Single Page Applications using modern JavaScript frameworks like React, Vue, and Angular in 2025'
pubDate: 'May 23 2025'
heroImage: '/developing-spa-with-modern-js-frameworks.webp'
---

# Developing SPA with Modern JS Frameworks

The perception of static websites, or rather Single Page Applications (SPAs), has changed a lot over the years, especially since the time of jQuery. Nowadays, the most popular JavaScript framework is Next.js. Even though Next.js is a meta-framework, it’s so popular that even the official React.js documentation recommends Next.js to get started with React.js.

Other popular JavaScript frameworks include Svelte (SvelteKit), Vue.js, Angular, and Ember.js. In this post, I will explore how to generate a static build of a website/web app using these frameworks/libraries.

## Svelte

My favorite framework of the bunch. I have developed production applications using Svelte, and its development approach has evolved significantly, especially with recent features like Runes. It’s quite easy to get started with Svelte. For the purpose of this article, I will be developing a proof-of-concept dashboard application using PocketBase. Even though the dashboard will have routing, I still chose not to use SvelteKit and bootstrapped the application using barebones Svelte.

```bash
npm create vite@latest pocketbase-dashboard -- --template svelte
```

Then I installed the dependencies:

```bash
cd pocketbase-dashboard
npm install
npm run dev
```

Bootstrapping the application is quite easy. I used AI to generate an HTML dashboard template using Tailwind. Then I used the HTML template to create the dashboard Svelte app. Even though Svelte introduced new ideas with `Runes` (which at first might seem counterintuitive compared to the previous API), you can become productive with it in no time.

Even before development started, my plan was to host the application on one of our Nginx servers as a static application. So, naturally, I ran `npm run build`. Once the build was complete, I wanted to test locally if things were working out of the box. For quick testing, I use [http-server](https://www.npmjs.com/package/http-server). When I navigated to the build folder and ran:

```bash
http-server -p 4000
```

and opened `http://localhost:4000`, it worked flawlessly.

Although Svelte recommends SvelteKit for building applications, it's good to see that building a SPA is still possible without much configuration changes. Another thing I also like about the official Svelte docs is that if you want to build a SPA and need a routing solution, they recommend quite a few options, which I liked very much. Even though they are moving in the direction of a SvelteKit-centered future, they still preserve the simplicity of Svelte.

For the time being, it seems it's quite simple to bootstrap a SPA using Svelte, but I am not sure how it will remain in the future. It seems like SvelteKit is the future of Svelte, which is not necessarily a bad thing, but I don't want to be in a future where I am forced to use SvelteKit for everything. I like the simplicity of Svelte, and I hope it will remain that way.

## Vue

Vue.js, the ever-evolving child of JavaScript frameworks, was created by Evan You. The first time I used Vue.js, it was version 0.4. To me, Vue always seemed much simpler compared to other frameworks of that time. It was the reason we chose to use it for our [SmartProperty](https://smartproperty.reformedtech.org/) management system. We used Vue.js version 2, and all of the application was always deployed as HTML files to Nginx servers. Since then, Vue has evolved quite a lot, and I haven't used Vue.js professionally for a while. When Vue.js version 3 came out, people were divided between the new API (Composition) and the previous (Options) API. Personally, I still like and prefer the Options API but see no problem adapting to the Composition API—it’s the future, isn’t it\!

So I also built the same application using Vue.js, added a couple of routes, and used Pinia for stores and stuff. When I was done, I just hit `npm run build`, and voilà, it generated a folder with HTML in it, and it also passed the http-server test. I was a bit confused as to what was happening and wanted to be sure it would work when deployed. And what do you know? It works perfectly fine. As it should be\! When I choose a JavaScript library, please don't assume I will be using it to build full-stack applications; I could use something else entirely on the backend.

## React

Considering how popular React is, you might find it surprising that I have added it last, and there's a good reason behind it. What is React? According to the official React docs, the answer is:

  - **The library for web and native user interfaces**

Seems simple enough. Let’s bootstrap a simple React.js application. Here are a few of my requirements:

  - The application will have routing.
  - It must be able to generate HTML files that can be deployed to any server.
  - State management is nice but optional (not building a large-scale app, so it’s fine).

On the [Create React App](https://react.dev/learn/creating-a-react-app) page, under the installation section, there are three ways to bootstrap a React.js application:

  - Next.js
  - React Router 7
  - Expo

I was a bit confused: where is the option for the `create-react-app` CLI tool? That's what I used to do when I last worked with React without Next.js. Turns out, it's not actively maintained anymore. So we could use Vite to bootstrap a project, but it wouldn't come with routing. I'd have to add other libraries or packages for that, which seems like unnecessary work. So I chose the "React Router 7" option from the React docs (which, as I discovered, sets up a project using Remix, previously a separate framework now closely tied to React Router) and bootstrapped a project.

The React Router 7 documentation is very good. I was able to put the application together quite fast, as I had already built the application twice, just needing to convert Vue/Svelte code to React. I was done with the whole thing in a couple of hours, including routing (yay\!).

Now it was time for the build and http-server test. Guess what happened? It did not generate something that could be deployed to any server. Assuming this was because it's positioned as one of the full-stack framework options in the official React docs, this makes sense. So how do you create a SPA with React Router 7 (when using a Remix-based setup)? There is [documentation](https://www.google.com/search?q=https://reactrouter.com/en/main/guides/spa-mode) for it. There are a few things you need to configure throughout your application, and only then will you be able to build something deployable to a server like Nginx, Caddy, or Apache.

I really like React (before developing a favoritism towards Svelte\!). There are many other ways to add routing to a Vite-generated React project, but this initial path should be much simpler for a basic SPA. If I want to build a SPA with React, the best option is to go with Vite and use `react-router-dom` directly. But if I want to build a full-stack application, I would go with Next.js, as it’s the most popular framework for building full-stack applications using React. The way things are moving, React.js might soon become synonymous with Next.js.

## Ember.js

I would not recommend Ember.js to develop small-scale applications. Ember.js has a ton of features pre-baked for creating enterprise-grade applications, and it's used by many corporations. The last time I used Ember.js, it was version 2.x.x; now it’s on version 6.3 (as of this writing in 2025). Even though it's targeted for large-scale applications, creating a SPA is quite simple with Ember.js. They even provide a guide on how it can be deployed to a server using Nginx. Nowadays, a more select group of people uses Ember.js. Ember.js has a ton of features that will make your life easy; you will hardly need any third-party packages to do the basic things. Here are some useful tools they ship with a default installation of Ember.js:

  - Ember Data - For data fetching
  - Glimmer - A lightweight UI component library
  - Ember Auto Import - For automatically importing modules from your app and addons

It has many other out-of-the-box tools for application development.

One thing I have to mention is that Ember.js is not targeted for creating full-stack applications like Next.js or SvelteKit. Maybe that’s the reason it’s not that complicated to create a SPA using Ember.js.

## Angular

Angular is a different beast altogether; it popularized the use of TypeScript heavily. It’s a highly opinionated framework and is also targeted towards enterprise-grade applications. Angular's core philosophy evolves around these ideas:

  - Component composition
  - Signals for reactivity
  - Angular popularized the concept of two-way data binding. It still exists in a modern way and can be achieved using dynamic template interfaces and Signals.
  - Another feature that Angular popularized in the frontend world is dependency injection; it’s a neat feature for sharing logic between components.

If I needed to work on a large-scale frontend application, I could see myself recommending Angular. Let’s see how easy it is to create a SPA using Angular.

It turns out Angular ships with Nx support out of the box. By default, the Angular CLI is used to build and serve Angular applications, and Nx can enhance this for monorepos and more complex build scenarios. Nx is a powerful set of tools for managing monorepos, and it can be used with Angular to create a more efficient development workflow.

Angular also provides out-of-the-box tools (or schematics like `ng add @angular/fire` for Firebase, `ng add @azure/ng-deploy` for Azure, etc., or guidance) to deploy Angular applications to Netlify, GitHub Pages, Vercel, and AWS S3. It also provides a server-agnostic guide on how you can deploy it to any other servers. Angular does not come with out-of-the-box solutions to build full-stack applications, but as it integrates well with Nx, you could easily create a monorepo structure with a backend framework like Hono or Express.js.

There are lots of JS frameworks in the wild: some specifically targeted to create full-stack applications like NestJS (or Nest.js), and some targeted to add interactivity to any page, like Alpine.js. One thing has changed for sure: nowadays, many JavaScript frameworks are pivoting to become full-stack application development platforms rather than just libraries/frameworks for creating SPAs. If I had to bootstrap a personal project, I would choose Svelte or Vue. But if I had to develop a large-scale application (like our DokanePOS), I would choose Next.js, just because of how popular it is and how easy it is to find developers for it.

Nowadays, with the rise of AI, Next.js has become the framework of the web, and its dominance will likely only increase unless something drastically changes.
