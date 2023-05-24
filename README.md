# Helios examples

## Required setup

- [Docker Desktop](https://www.docker.com/get-started/)
- [NodeJS](https://nodejs.org)


### Demo: [https://violet-ui.internal.dev.cborbit.com/](https://violet-ui.internal.dev.cborbit.com/)

## Storybook - Helios Examples

This repository contains various widgets that are built using Svelte. Each widget has its own folder within the widgets directory, and includes a package.json file that lists its dependencies. In addition, each widget also has a Storybook configuration file that enables you to preview and test the widget in isolation.

### Running storybook
```
make run-storybook
```

This command will install the dependencies for the widget (if they are not already installed) and launch Storybook in your default web browser. You can then interact with the widget and view its various states and variations in the Storybook UI.

## Creating Usecases

The "create-usecase" command is a common tool used by developers to quickly generate a basic application structure for testing and prototyping purposes. It's a simple command that can save a lot of time and effort when setting up a new project.

To use the "create-usecase" command, you'll need to have a command-line interface (CLI) installed on your computer. This could be the built-in Terminal application on a Mac or the Command Prompt or PowerShell on a Windows machine.

Once you have a CLI open, navigate to the directory where you want to create your sample application. Then, type the following command:

```
make create-usecase
```

This will generate a basic application structure with some sample files and folders. Also this will ask the application name in the prompt. The created app is on widgets/ folder.

The "run-svelte-app" command will install the apps dependencies in a docker container and run in development mode.

```
make run-svelte-app
```

You can run this command for another apps inside this repo inserting APP=<app-name>

```
make run-svelte-app APP=<app-name>
```

You can customize the generated application by modifying the files and folders as needed. For example, you might want to change the name of the main file or add additional files for your specific use case.

Overall, the "create-usecase" command is a useful tool for quickly getting started with a new project. By automating the creation of a basic application structure, it allows developers to focus on building out their application logic and functionality rather than wasting time on initial setup.

To install dependencies and run in development mode:

```
cd <app-name>
docker compose up
```

And to run build:

```
docker compose up --build
```

## Deploying examples

All examples contains a Dockerfile to simplify deployments.

### Deploying to Epinio

- Install [Epinio CLI](https://docs.epinio.io/installation/install_epinio_cli).
- Do login to the epinio server:
  - By using OIDC running `make login-ep EPINIO_URL=<epinio_server_url>` that will output a URL to login.
  - By using user/password: `make login-ep USERNAME=<user> PASSWORD=<pass> EPINIO_URL=<epinio_server_url>`.
- Push the application `make deploy-ep APP=<example_folder>`
  - Note: It is possible to change the app URL by providing the EP_APP parameter `make deploy-ep APP=<example_folder> EP_APP=<app_name>` that will deploy the application to `https://<app_name>.<epinio_server_domain>`, the EP_APP parameter defaults to the value of APP parameter.
