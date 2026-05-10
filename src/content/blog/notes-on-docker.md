---
title: "Notes on Docker"
description: "My Personal notes on docker"
tags: [docker, containerization]
pubDate: "Apr 21 2026"
---

## What is Docker?

Docker makes development efficient and predictable.

> Docker takes away repetitive, mundane configuration tasks and is used throughout the development lifecycle for fast, easy and portable application development – desktop and cloud. Docker's comprehensive end to end platform includes UIs, CLIs, APIs and security that are engineered to work together across the entire application delivery lifecycle.
>
> — The Docker team

## What is Docker Hub?

Docker Hub is the official cloud service for storing and sharing Docker images (more on that later).

There are several alternatives to Docker Hub:

- AWS ECR
- GCP Artifact Registry
- Azure Container Registry

## What are Containers?

> A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.
>
> — Docker

### Why Are Containers Lightweight?

Virtual machines virtualize hardware, they emulate what a physical computer does at a low level. Containers virtualize at the operating system level and share the host OS kernel. Isolation between containers that are running on the same machine is still really good. For the most part, each container feels like it has its own operating system and filesystem. In reality, a lot of resources are being shared, but they're being shared securely through namespaces.

## Docker Images

So a "container" is kinda like a lightweight VM, great... so what's an image?

- **Image:** A read-only definition of a container.
- **Container:** An instance of a virtualized read-write environment.

A container is basically a runnable instance of an image. In other words, you boot up a container from an image. You can create multiple separate containers all from the same image (it's kinda like the relationship between classes and objects).

## Running Docker

Example:

```bash
docker run -d -p hostport:containerport namespace/name:tag
```

- `-d`: Run in detached mode (doesn't block your terminal)
- `-p`: Publish a container's port to the host (forwarding)
- `hostport`: The port on your local machine
- `containerport`: The port inside the container
- `namespace/name`: The name of the image (usually in the format `username/repo`)
- `tag`: The version of the image (often `latest`)

## Docker Stop/Kill

- `docker stop`: Sends a `SIGTERM` to the container (or whatever signal is configured via `STOPSIGNAL` in the Dockerfile, which defaults to `SIGTERM`), then waits a grace period of 10 seconds before sending `SIGKILL` if the container hasn't exited. The waiting time can be configured with the `-t`/`--time` flag. You'll typically want to use `docker stop`.
- `docker kill`: Stops the container immediately by issuing a `SIGKILL` signal (a different signal can be specified with `--signal`). This is a more forceful way to stop a container, and should be used as a last resort.

## Volumes

```bash
docker volume create volume_name
docker volume ls
docker volume inspect volume_name
```

## Flow

Pull an image:

```bash
docker pull ghost
```

Run the image:

```bash
docker run -d -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 -v ghost-vol:/var/lib/ghost ghost
```

A container's file system is read-write, but when you delete a container, and start a new one from the same image, that new container starts from scratch again with a copy of the image. All stateful changes are lost.

A volume's file system is read-write, but it lives outside a single container. If a container uses a volume, then stateful changes can be persisted to the volume even if the container is deleted.

Volumes are often used by applications like Ghost, Grafana, or WordPress to persist data so that when a container is deleted and a new one is created the state of the application isn't lost. Containerized applications are typically thought of as ephemeral (temporary). If your application breaks just because you deleted and recreated a container, it's not a very good containerization!

## Docker Commands

Filter by container name:

```bash
docker ps -a -q --filter="name=<containerName>"
```

Filter by image name:

```bash
docker ps -a -q --filter ancestor=<image-name>
```

Stop and remove all containers created from an image:

> Be careful with this command: it stops and removes every container created from the image. Run the filter command first if you want to check what will be affected.

```bash
docker rm $(docker stop $(docker ps -a -q --filter ancestor=<image-name> --format="{{.ID}}"))
```

### Live Shell

Being able to run one-off commands is nice, but it's often more convenient to start a shell session running within the container itself. That's where the `-i` and `-t` flags come in:

```bash
docker exec -it <container> /bin/sh
```

- `-i` makes the `exec` command interactive
- `-t` gives us a tty (keyboard) interface
- Running `/bin/sh` gives us a shell session inside the container

## Dockerfile

Example:

```dockerfile
# This is a comment

# Use a lightweight debian os
# as the base image
FROM debian:stable-slim

# execute the 'echo "hello world"'
# command when the container runs
CMD ["echo", "hello world"]
```

Build using Dockerfile:

```bash
docker build . -t helloworld:latest
```

> The `-t helloworld:latest` flag tags the image with the name "helloworld" and the "latest" tag. Names are used to organize your images, and tags are used to keep track of different versions.

## Docker Logs

When containers are running in detached mode with the `-d` flag, you don't see any output in your terminal, which is nice for keeping your terminal clean, but what if something goes wrong?

```bash
docker logs [OPTIONS] CONTAINER
```

## Docker Stats

The `docker stats` command is used to check a container's live resource usage: CPU %, memory usage and limit, network I/O, and block I/O (disk read/write totals). Note that it shows cumulative network and block I/O totals, not on-disk size — to inspect storage size, use `docker ps -s` or `docker system df`.

```bash
docker stats [OPTIONS] [CONTAINER...]
```

Example usage:

```bash
docker stats caddy1 --no-stream
```

## Docker Top

The `docker top` command shows the running processes inside a container.

```bash
docker top CONTAINER [ps OPTIONS]
```

Use `stats` for entire containers and `top` for processes in a container.

## Docker Publish

To publish a Docker image:

```bash
docker push USERNAME/image
```

To pull the image:

```bash
docker pull USERNAME/image
```

When you make changes to your app, source code, or Dockerfile and build a new image, you add a tag to it.

Example:

```bash
docker build . -t USERNAME/image:0.2.0
```

Now we can push this to the Docker registry:

```bash
docker push USERNAME/image:0.2.0
```

### Latest

While working with Docker, you might have seen we often pull images tagged `latest`.

Example:

```bash
docker pull nginx:latest
```

If you omit a tag, Docker defaults to the `:latest` tag, but `:latest` is just a tag name; it does **not** automatically mean the most recently pushed image. If you build an image without specifying a tag, Docker uses `latest` by default, so from above, even though `USERNAME/image:0.2.0` is our most updated image, the `:latest` tag would still resolve to whichever earlier version was last pushed under that name.

The convention is to use semantic versioning for images and to also push to the `latest` tag on your most recent image.

```bash
docker build -t USERNAME/image:0.3.9 -t USERNAME/image:latest .
docker push USERNAME/image --all-tags
```

This will tag the latest build with the `latest` tag.

## The Deployment Process for a Typical Web App

- The developer (you) writes some new code
- The developer commits the code to Git
- The developer pushes a new branch to GitHub
- The developer opens a pull request to the main branch
- A teammate reviews the PR and approves it (if it looks good)
- The developer merges the pull request
- Upon merging, an automated script, perhaps a GitHub action, is started
- The script builds the code (if it's a compiled language)
- The script builds a new Docker image with the latest program
- The script pushes the new image to Docker Hub
- The server that runs the containers, perhaps a Kubernetes cluster, is told there is a new version
- The k8s cluster pulls down the latest image
- The k8s cluster shuts down old containers as it spins up new containers of the latest image
