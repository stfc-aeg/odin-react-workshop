# Odin React Workshop

<p align="center">
    <img src="./images/odin_react_logo.png" height="200"/>
</p>

# Introduction

## What is Odin React?

- A component library and GUI framework designed to work with [Odin Control](https://github.com/odin-detector/odin-control)
- Based on the [React](https://react.dev/) web development library, built with [Vite](https://vite.dev/)
- Designed to streamline, speed up, and unify GUI development for our detector projects
- Uses [Axios](https://axios-http.com/docs/intro) to handle HTTP requests. Axios is a promise based client that handles request and response serialization.

## What is React?

- A Javascript based library that allows for the creation of *Components*; individual reusable UI elements that can their own logic and state.
    - these components are Javascript Functions that return markup:
    ```javascript
    function MyButton() {
        // Notice Components always start with capital letters
        // to differentiate from standard HTML tags
        return(
            <button>I'm a button</button>
        );
    }
    ```
- This markup syntax is called **JSX**, which is what allows for the mixture of html and javascript within a single file and object.

## What Is Vite?

- Vite is an open source build tool that provides compilation and a development environment.
- During Development, vite provides a Development Server with Hot Module Replacement (where it monitors the code, and refreshes the server if any changes are made)
- Once development is complete, Vite bundles the source code, image assets, and dependencies together into a static web page that can be served by Odin Control

# Core Concepts

## Odin Control Adapter Connection
- Two component-like objects do all the heavy lifting of connecting to and using the Odin Control API, and cover everything a standard GUI would likely need in passing data to and from the Adapter:

### useAdapterEndpoint
- Provides all the RESTful API methods to interact with the Odin Control Adapter Parameter Tree
- Maintains a local copy of the Parameter tree and the Metadata, if the adapter supports it.
- Can be setup to make periodic requests of the Adapter to monitor updating data
- Has error handling in case of HTTP errors, such as loss of connection or incorrectly done requests.

### WithEndpoint
- Wraps an existing Component to automate its connection to an Endpoint, creating a modified component that can then be reused.
- Provides event handlers that will perform http PUT requests as required.
- Supports buttons, text input, dropdowns, checkboxes, radio buttons, and more, automatically.
- Can be provided with functions to run before and/or after the PUT request
- Can monitor the value within the Endpoint Parameter Tree and display up to date data if changed.
- Can use metadata to limit input options (e.g: a number input with a Minimum and Maximum value)

## OdinApp
- A top level component that provides a navigation bar, routing to multiple pages, and a display for potential errors if something goes wrong.
- Should contain all the pages of a GUI, to properly render and navigate between them.

## Model-View-Controller Design Pattern
- Odin Control and Odin React are designed to separate *business logic* from the GUI presentation.
- The GUI should not implement control logic, but should trigger events within the Adapter to do so.

# Workshop

The workshop will involve making sure we have an Odin Control instance running to interact with, and then using [Cookiecutter](https://www.cookiecutter.io/) to instantiate a React Application using one of the available templates.

## Installing The Adapter

- An Odin Control Adapter is available for use within this workshop which will provide a parameter tree we can interact with using our GUI.

- To install it, navigate to the `control` directory within this repo and, using your preferred virtual environment (version 3.10 or higher), install the adapter:

```bash
cd control
pip install -e .
```

Run the adapter:
```bash
odin_control --config web/config/odin.cfg
```

## Creating the React Project

In a new terminal, create and move into the `static` directory, and copy one of the templated Odin React projects:

```bash
mkdir control/web/static
cd control/web/static

# Within a python Virtual Environment (this can be the same one as before), ensure `cookiecutter`is installed. This tool allows us to automatically download and build upon templates:

pip install cookiecutter

# Using cookie cutter, create a new project from one of the available templates:
cookiecutter git+ssh://git@github.com/stfc-aeg/odin-react-template
```

Cookiecutter will then provide prompts to select which template to use, and setup other values ready for the project. We're going to use the Typescript template, as using Typescript instead of Javascript gives us more control during development. It still compiles into standard Javascript when it runs or is built into the final application:

```bash
# Options from cookiecutter. Ideally, you should follow these options for the workshop:
Select a template
    1 - Javascript Template (javascript)
    2 - Typescript Template (typescript)
    Choose from [1/2] (1): 2
  [1/6] Set the name of the project (Project Name): React Workshop
  [2/6] Set the name of the package (reactworkshop): 
  [3/6] Name of the adapter that the default template will connect to (reactworkshopAdapter): workshop
  [4/6] Name the main folder the application will be in (app): 
  [5/6] The default endpoint of the Odin Control instance (http://localhost:8889): http://localhost:8888
  [6/6] Include the optional Plotly package for graphing [y/n] (n): yes
```

Once created, you need to ensure the dependencies are installed and ready, and then you can start developing the app:

```bash
cd app
    # nodejs is the javascript runtime environment that allows us to use React
module load nodejs
    # this step will install all the dependencies declared in package.json. It may take a few minutes
npm install

    # after installation of the dependencies is completed, run the development server:
npm run dev
```

When running, the development server will display the address of the webpage it is serving. It will also monitor the React project's codebase, and will reload the server if anything changes.

Terminal Output:
```
  VITE v7.0.4  ready in 442 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Begin developing the React Project
