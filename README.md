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

Odin React uses [Storybook](https://storybook.js.org/) to document, demo, and test. For more details, see the links below:
- [Interactive Documentation](https://stfc-aeg.github.io/odin-react/)
- [Live Demo](https://stfc-aeg.github.io/odin-react/iframe.html?id=demo-page--default&viewMode=story)

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
- Components can be provided with arguments, called *props*, for various purposes. These are passed to the component like *html attributes*, and become an object parameter in the component function that can be [destructured](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring).

```javascript
 function MyButton(props) {
    const button_text = props;

    return (
        <button>{button_text}</button>
    )
 }

 ...

 <MyButton button_text="Click Here" />
```

## What Is Vite?

- Vite is an open source build tool that provides compilation and a development environment.
- During Development, vite provides a Development Server with Hot Module Replacement (where it monitors the code, and refreshes the server if any changes are made)
- Once development is complete, Vite bundles the source code, image assets, and dependencies together into a static web page that can be served by Odin Control

# Core Concepts

## Odin Control Adapter Connection
- Two component-like objects do all the heavy lifting of connecting to and using the Odin Control API, and cover everything a standard GUI would likely need in passing data to and from the Adapter:

### useAdapterEndpoint
- Provides all the RESTful API methods to interact with the Odin Control Adapter Parameter Tree
- Caches a copy of the Parameter tree
    - And the Metadata, if the adapter supports it.
- Can be setup to make repeated requests of the Adapter to monitor updating data
- Has error handling in case of HTTP errors, such as loss of connection or incorrectly done requests.

### Endpoint Components
- Pre-existing Input components (such as buttons or text boxes) with added functionality to automatically work with an Adapter Endpoint, performing PUT requests whenever appropriate.
    - For example, the `EndpointButton` component will do the PUT request whenever clicked.
    - An `EndpointInput` will PUT whenever the Enter key is hit while typing in the textbox.

### OdinApp
- A top level component that provides a navigation bar, routing to multiple pages, and a display for potential errors if something goes wrong.
- Should contain all the pages of a GUI, to properly render and navigate between them.

### Model-View-Controller Design Pattern
- Odin Control and Odin React are designed to separate *business logic* from the GUI presentation.
- The GUI should not implement control logic, but should trigger events within the Adapter to do so.

<br></br>

---
# Workshop

The workshop will involve making sure we have an Odin Control instance running to interact with, and then using a **Template Project** to start developing the GUI.

The workshop requires a python virtual environment compatiable with Odin Control. This is currently `3.8` or above.

The workshop also requires [nodejs](https://nodejs.org/en), which can be sourced from `/aeg_sw/apps` via `module load` if running this workshop from a machine connected to the DSSG network.

## Installing The Adapter

- An Odin Control Adapter is available for use with this workshop which will provide a parameter tree we can interact with using our GUI.

- To install it, navigate to the `control` directory within this repo and, using your preferred python environment, install the adapter:

```bash
cd control
pip install .
```

Run the adapter:
```bash
odin_control --config web/config/odin.cfg
```

## Creating the React Project

With a basic Odin Control instance running, we can begin creating the GUI for that project.

> [!NOTE]
> To begin with, we'll copy a templated version of a basic Odin React GUI and run it in Development mode.
> 
> Once the GUI is completed, it can be compiled into static code and served by Odin Control as a static resource. While developing, the GUI will be served standalone on a different address and port than Odin Control, which means it must be configured to accept CORS (Cross Origin Sharing) requests.

Using `npm` (the `nodejs` package manager), we can use the available Template Project from the web. In a new terminal:
```bash
# The new terminal should be in the same directory as the Odin Control project
cd control

# This command fetches the templated Odin React project from npmjs.com, the package management site. It's similar to Python's PyPI.org.
npm create @dssg/odin-react

```

This should then provide us with a series of prompts on the command line to customise the template. Make sure your responses match those shown here:
```bash
┌  Create Odin React GUI
│
◇  GUI App Project Name
│  React Workshop
│
◇  GUI App Root Directory
│  web/static
│
◇  Name of the Adapter to connect to
│  reactworkshop
│
◇  URL of the Odin Control API
│  http://localhost:8889
│
◇  Include Plotly graphing Package?
│  No
│
◇  Install and run Dev Server?
│  Yes
```

You'll then see the output below, showing that it is copying and installing the template. Do note that the Dependency Installation step may take a few minutes.

```
│
◇  Initialising...
│
◇  Scaffolding Completed
│
◇  Updating package.json...
│
◇  Setting Adapter API config...
│
◇  Installing Dependencies with NPM...
```

When running, the development server will display the address of the webpage it is serving. It will also monitor the React project's codebase, and will reload the server if anything changes.

Terminal Output:
```
  VITE v7.0.4  ready in 442 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

>[!IMPORTANT]
> If you do not see this output, you may have told the template not to automatically install and run, or you may have accidentally shut the server down. In which case, you'll need to run the following commands:
>
> ```bash
> cd web/static
> 
> # this step will install all the dependencies declared in "package.json" if they are not already. It may take a few minutes
> npm install
> 
> # after installation of the dependencies is completed, run the development server:
> npm run dev
> ```

Open this address in your web browser of choice (Odin React has been developed to explicitly support either **Firefox** or **Chrome**) and you should see something like the following:
<p align="center">
<img src="./images/react_workshop_initial.png"/>
</p>

Feel free to use the generated controls to get a feel for how the various GUI components interact with your Odin Control adapter.

>[!WARNING]
> This initial state of the React GUI grabs the full Parameter Tree from your Odin Control server and displays some auto-generated controls based on the response.
>
> If for some reason you do not see these controls, and/or see warnings about the connection, check that your Odin Control server is running and that the address used when copying the React Template matches the one Odin Control is listening on.

## Begin developing the React Project

Now that you have a starting point, we can begin to build upon this to add specific controls with the Adapter!

## Remove the Auto Generated Controls

Whilst useful for testing a new GUI project, the generated controls are not designed for use in a final system. Our first step should be to remove these controls to replace them with our own specific design.

With your preferred code editor, open `control/web/static/src/Page.tsx` and make the following changes:

```diff
- import { TitleCard, ParamController } from "@dssg/odin-react";
+ import { TitleCard } from "@dssg/odin-react";
import type { AdapterEndpoint } from "@dssg/odin-react";
import { Container, Row, Col } from 'react-bootstrap';
import { type EndpointParams } from "./App";

interface PageProps {
    endpoint: AdapterEndpoint<EndpointParams>
}

const Page = ({
    endpoint
}: PageProps) => {

    return (
        <Container>
            <Row>
                <Col>
                    <TitleCard title="Demo">
                        A Basic page using Bootstrap's Row/Col grid layout.
                        Use this as a starting point for your GUI.
                        <br />
                        Below is an auto-generated set of controls for your
                        adapter to test and confirm the connection is working.
                        This should not be used in the final GUI and is for debug
                        purposes only
                    </TitleCard>
                </Col>
            </Row>
            <Row>
                <Col>
-                   <ParamController endpoint={endpoint} title="reactworkshop"/>
                </Col>
            </Row>
        </Container>
    )
}

export default Page;
```

With that removed, we can design the GUI ourselves.

## Reading from the Adapter

The endpoint provides a `data` object we can reference to display our parameters.
If all we want is to show some value from a parameter without editing it, reading from this object is all we need to do. It handles all the `GET` requests and data parsing for us.

We can add a label to the GUI that displays the current value of the `rand_num` parameter. This number gets updated periodically, so we can watch it for changes. 

**Editing `src/Page.tsx`**:

```diff
import { TitleCard } from "@dssg/odin-react";
import type { AdapterEndpoint } from "@dssg/odin-react";
- import { Container, Row, Col } from 'react-bootstrap';
+ import { Container, Row, Col, Badge } from 'react-bootstrap';
import { type EndpointParams } from "./App";

interface PageProps {
    endpoint: AdapterEndpoint<EndpointParams>
}

const Page = ({
    endpoint
}: PageProps) => {

    return (
        <Container>
            <Row>
                <Col>
                    <TitleCard title="Demo">
-                       A Basic page using Bootstrap's Row/Col grid layout.
-                       Use this as a starting point for your GUI.
-                       <br />
-                       Below is an auto-generated set of controls for your
-                       adapter to test and confirm the connection is working.
-                       This should not be used in the final GUI and is for debug
-                       purposes only
+                       Random Number: <Badge>{endpoint.data?.rand_num ?? "Unknown"}</Badge>
                    </TitleCard>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TitleCard title="">
                </Col>
            </Row>
        </Container>
    )
}

export default Page;
```
>[!TIP]
> When using this data object, its a good idea to always use the [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) `?.` operator to access parts of the `data` object. This is because it initialises as `null`.
> It can also be useful to provide a default value if it is null using the [Nullish Coalescing Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) `??`. This means that if the left side of the operator is `null` or `undefined`, use whatever value is on the right side instead.

>[!NOTE]
> Depending on your editor and how it is set up, you may get warnings when using this parameter about `Type 'ParamNode' is not assignable to type 'ReactNode'.` or similar.
> This is because of the way the template sets up the default `AdapterEndpoint` component. We can fix this issue later, but it is safe to ignore for now.

If we return to the browser, the changes made to the page should have been reloaded and the Input but now visible:

<p align="center">
<img src="./images/react_workshop_added_badge.png"/>
</p>

However, this displayed number is not changing, even though the one in the adapter is. It only changes when we reload the page.
This is because our `AdapterEndpoint` only fetches the Parameter Tree when it's told to and then caches it. In this example, that's only when it first loads.
We can tell it to constantly poll when we create it by providing it with a value in milliseconds for how often to fetch the tree and update it's cached `data` object.

Lets get it to poll the adapter every second.

**Editing `src/App.tsx`**

```diff
import 'bootstrap/dist/css/bootstrap.min.css';

import { OdinApp, useAdapterEndpoint, type ParamNode } from "@dssg/odin-react";
import Page from "./Page";

/**An Interface to define the shape of the Parameter Tree from the Odin Control Adapter.
* Define Parameter Names and Types here to allow your IDE to know what they are
* if and when accessing the data within your App
* */
export interface EndpointParams extends ParamNode {
  /* Add any Parameters you'll be using to this interface, such as this example*/
  example: string;
}

const App = () => {

  // Connect to the Odin Control Adapter you specified.
  // More endpoints for other adapters can be created.
-  const endpoint = useAdapterEndpoint<EndpointParams>("reactworkshop", import.meta.env.VITE_ENDPOINT_URL);
+ const endpoint = useAdapterEndpoint<EndpointParams>("reactworkshop", import.meta.env.VITE_ENDPOINT_URL, 1000);
  return (
    <OdinApp title="React Workshop">
      <Page endpoint={endpoint}/>
    </OdinApp>
  )
}

export default App

```
Make this change, and then return to the Browser to see that the number now updates. The `AdapterEndpoint` object is now refreshing it's copy of the Parameter Tree as often as we've told it to.

## Writing to the Adapter

We can now see one of the Parameters from the Adapter, and see it update. But we almost certainly also want to be able to make changes in the Adapter to control various things.

To do so easily, Odin React provides a handful of `Endpoint Components` designed for this exact purpose.

### Adding a Textbox

To start with, add an [EndpointInput](https://stfc-aeg.github.io/odin-react/?path=/docs/components-withendpoint-endpointinput--docs) to control the value of a string Parameter. We can create a new [TitleCard](https://stfc-aeg.github.io/odin-react/?path=/docs/components-titlecard--docs) to contain these new controls next to the badge display we created earlier.

**Editing `src/Page.tsx`**

```diff
- import { TitleCard } from "@dssg/odin-react";
+ import { TitleCard, EndpointInput } from "@dssg/odin-react";
import type { AdapterEndpoint } from "@dssg/odin-react";
- import { Container, Row, Col, Badge } from 'react-bootstrap';
+ import { Container, Row, Col, Badge, Inputgroup } from 'react-bootstrap';
import { type EndpointParams } from "./App";

interface PageProps {
    endpoint: AdapterEndpoint<EndpointParams>
}

const Page = ({
    endpoint
}: PageProps) => {
    
    return (
        <Container>
            <Row>
                <Col>
                    <TitleCard title="Demo">
                        Random Number: <Badge>{endpoint.data?.rand_num ?? "Unknown"}</Badge>
                    </TitleCard>
                </Col>
-           </Row>
-           <Row>
                <Col>
+                   <TitleCard title="Controls">
+                       <InputGroup>
+                           <InputGroup.Text>String Input</InputGroup.Text>
+                           <EndpointInput endpoint={endpoint} fullpath="string_val"/>
+                       </InputGroup>
+                   </TitleCard>
                </Col>
            </Row>
        </Container>
    )
}

export default Page;
```


This textbox will automatically display the current value from the `AdapterEndpoint` Parameter Tree, and will do a PUT request to the path specified if you change the value and hit the Enter key. If we return to the browser, the changes made to the page should have been reloaded and the Input but now visible:

<p align="center">
<img src="./images/react_workshop_added_input.png"/>
</p>

And when changing the value, the input is highlighted to show that it has been modified:

<p align="center">
<img src="./images/react_workshop_changed_input.png"/>
</p>

If you then hit the Enter key whilst editing the text within the box, it will be sent to the Adapter. You should see something similar to the following in the terminal running Odin Control:

```
[I 260713 14:54:57 controller:92] PUT request received at path: string_val with data {'value': 'String Value'}
```

The `EndpointInput` component can also be used for other Parameters in the same way, including numerical ones.

>[!TIP]
> `Endpoint components` will utilize the metadata provided by the Parameter Tree. If a Parameter is not defined as *Writeable*, the component will be disabled so that the user can visually see it is not an editable field.
>
> With numerical Parameters it will also use any *min* or *max* values defined in the metadata.


### Adding a Button

Lets now add an [EndpointButton](https://stfc-aeg.github.io/odin-react/?path=/docs/components-withendpoint-endpointbutton--docs) to the same page, to trigger some sort of event in the Adapter.

We can also provide it with any of the `props` that the normal component would use. These `props` get passed to the underlying component; in this case, the bootstrap `Button`. We can demonstrate this by using the `variant` prop of the button.

```diff
- import { EndpointInput, TitleCard } from "@dssg/odin-react";
+ import { EndpointButton, EndpointInput, TitleCard } from "@dssg/odin-react";
import type { AdapterEndpoint } from "@dssg/odin-react";
import { Container, Row, Col, Badge, InputGroup } from 'react-bootstrap';
import { type EndpointParams } from "./App";

interface PageProps {
    endpoint: AdapterEndpoint<EndpointParams>
}

const Page = ({
    endpoint
}: PageProps) => {
    
    return (
        <Container>
            <Row>
                <Col>
                    <TitleCard title="Demo">
                        Random Number: <Badge>{endpoint.data?.rand_num ?? "Unknown"}</Badge>
                    </TitleCard>
                </Col>
                <Col>
                    <TitleCard title="Controls">
                        <InputGroup>
                            <InputGroup.Text>String Input</InputGroup.Text>
                            <EndpointInput endpoint={endpoint} fullpath="string_val"/>
                        </InputGroup>
+                       <EndpointButton endpoint={endpoint} fullpath="trigger"
+                       value="Triggered Value" variant="success">
+                           Trigger
+                       </EndpointButton>
                    </TitleCard>
                </Col>
            </Row>
        </Container>
    )
}

export default Page;
```
<p align="center">
<img src="./images/react_workshop_added_button.png"/>
</p>

Clicking this button should should show something similar to the following in the terminal running Odin Control:
```
[I 260713 15:21:38 controller:92] PUT request received at path: trigger with data {'value': 'Triggered Value'}
[W 260713 15:21:38 controller:80] Event Triggered by API with value: Triggered Value
```

>[!NOTE]
> We didn't provide the `EndpointInput` component a value, but we do with the `EndpointButton` component. If an `Endpoint Component` is not provided a `value` prop, it will always use the value read from the Parameter Tree. This is fine for input boxes, but buttons and similar components might want to send a specific value when clicked.
>
> When assigning a value to one of these components, that value does not have to be a simple hardcoded string like this example. You might want to calculate a value based on other Parameters, or even use React `State` variables (which are explained later in this workshop)


### Exercise: Add More Controls

Try adding more controls to the page, referring to the [Interactive Documentation](https://stfc-aeg.github.io/odin-react/) to see what other components are available. The list of Endpoint Components is shown under the `WithEndpoint` folder in the sidebar.

For instance, try using the `EndpointInput` again, but this time for the `num_val` parameter to see how it changes when used for an integer.

You could also try using the [EndpointDropdown](https://stfc-aeg.github.io/odin-react/?path=/docs/components-withendpoint-endpointdropdown--docs) component to control a Parameter with limited potential values. The `selected` Parameter on the Demo Adapter uses metadata to specify *Allowed Values*, which the dropdown component will use to generate a dropdown menu automatically.

## Error Handling

- The Templated project sets up some error handling mechanisms for the application.
    - This will automatically display on screen any errors that may occur due to the Odin Control Adapter being inaccessible, or other issues with the HTTP requests.
- Test this by shutting down the Odin Control instance and attempting to enter a new value for a parameter:

<p align="center">
<img src="./images/react_workshop_input_error_updated.png"/>
</p>

- It can be worth creating fallback values for things like the Badge that display the value, in case the data isn't available straight away. This can be done with a [Nullish Coalescing Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

```TSX
<TitleCard title="Demo">
    {/* Get the parameter out of the tree just using Dot Notation */}
    Random Number: <Badge>{endpoint.data.rand_num ?? "Undefined"}</Badge>
</TitleCard>
```

## Layout

- Odin React is designed to make use of the [Bootstrap Grid Layout](https://react-bootstrap.netlify.app/docs/layout/grid)
- Organise page contents using the `Row` and `Col` components
    - Bootstrap provides means to set the width of the columns as shown [Here](https://react-bootstrap.netlify.app/docs/layout/grid#setting-one-column-width). The grid classes shown split the width of the container into **12**, so setting a grid class to **6** would set it to take up half the space available.
- Group related controls and components within a [Title Card](https://github.com/stfc-aeg/odin-react/wiki/TitleCard)

## Custom CSS Styling

- Most styling is provided by Odin React or by Bootstrap.
    - Bootstrap uses a global CSS file imported at the top component of the standard Odin React templated project, seen at the top of the `app.tsx` file.
    - The order of imports matters in React JSX/TSX, so **a second CSS file imported after the first one will overwrite any matching CSS Class rules**

If custom styling is required, it's recommended that you use a [CSS module](https://github.com/css-modules/css-modules), rather than importing a plain css file. CSS Modules scope class names locally, avoiding clashes

```TSX
//example.tsx

...

import styles from './example.module.css';

...

<div className={style.customDiv}>
    ...
</div>
```

## React Hooks

[Hooks](https://react.dev/reference/react/hooks) are a React feature that allow you to add different features to React Components. React provides a handful of build-in Hooks that are useful to know about.

> [!WARNING]
> Hooks can only be used at the **Top Level of a Component**. They cannot be used within functions or any sort of conditional or loop. Hooks can only be called with React is rendering a functional component (I.E: during the main body of the function, before any return statement)

### [useState](https://react.dev/reference/react/useState)

- Components sometimes need to "remember" information, such as user input. This kind of component-specific memory is called [State](https://react.dev/learn/state-a-components-memory).

- We can't use standard variables for this, as they won't persist between renders. When React re-renders a component due to any changes, it won't consider changes made to local variables.

- `useState` is a Hook that lets you add this state to your component in a way that will persist, even if the component gets re-rendered. This state will also trigger React to render the component with the new data.

```tsx
import { useState } from 'react';

...

const [state, setState] = useState(initialState);
```

- The hook provides two things, a **State Value** (`state`), and a **State Setter Function** (`setState`) to update that state.
- Calling the **Setter Function** with a new value will update the **State Value** when the component is re-rendered.
- The **Setter Function** can set state based on previous state by passing an **Updater Function**:
  ``` tsx
  setState(oldState => oldState + 1);
  ```

> [!WARNING]
> The **Setter Function** does not update the **State Value** in currently running code. It instead requests a re-render of the component will the new state. That means that you cannot update a state within a function and then use the updated **State Value** straight away within that same function:
> ``` tsx
> const [count, setCount] = useState(0);
>
> function handleClick() {
>    console.log(count) // 0
>
>    setCount(count + 1); // Request rerender with 1
>    console.log(count); // still 0!
> }
> ```

### [useCallback](https://react.dev/reference/react/useCallback)

- Caches a function definition between re-renders, and only re-defines that function if any of its **Dependencies** change

``` tsx
const cachedFunc = useCallback(Func, dependencies);
```

- Dependencies is a list of *Reactive Values* (Such as State or Props) within the function that might change. If any of these values change, the callback updates the method to use the new values.
- [Linters](https://eslint.org/) configured for React will verify that every *Reactive Value* within a function is specified as a dependency. It is unusual for a callback to not require every *Reactive Value* as a dependency, as missing dependencies means a callback runs the risk of running with stale State, or old values.

### [useEffect](https://react.dev/reference/react/useEffect)

- Runs an Effect whenever one of its **Dependencies** changes.
- Will run when the component first loads
- The Effect can return a *Cleanup* function that will run first when the dependencies change with the old values, before running the effect
- Often used with [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval) to call a function repeatedly

``` tsx

const interval = 1000;

useEffect(() => {
    const timer_id = setInterval(PeriodicFunc, interval);  // run PeriodicFunc every second

    return () => {
        clearInterval(timer_id); //cleanup code
    }
}, [interval, PeriodicFunc]); //array of Dependencies
```

> [!TIP]
> If you want an Effect to run only when the component initially renders, pass it an **Empty Dependency Array**. If you don't pass it any dependency array, the effect will run **after every re-render of the component**.

> [!WARNING]
> **Using Objects in Dependency Arrays is a Bad Idea**
>
> Because of the way React compares Objects, putting an object into a Hook's *Dependency Array* will cause that hook to re-run at every render.
>
> The [React Docs](https://react.dev/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally) have more details about why this happens, and how to negate the issue.

## Compiling a Finished GUI

Once the development of the GUI is completed, it needs to be built as a Static Resource, which can then be served by your Odin Control project. This is a fairly simple process:

- run `npm run build` in the GUI's top directory. This will produce a `dist` folder containing the static version of your GUI application.
- copy the resulting `dist` folder into the `web/static` or `test/static` directory of your Odin Control project.
- ensure the Odin Control config sets the static path to this `dist` folder in one of two ways
    - `static_path = web/static/dist` in the config file
    - `--static = web/static/dist` on the command line when running Odin Control

Standard practice when developing Odin React is to utilize `.env` files to specify the address of any Odin Control instances it needs to connect to (as seen in the example AdapterEndpoint provided). During development, this file is the `.env.development.local` produced by the template. During compilation, it will look for a `.env.production` or `.end.production.local` file to get the address required and hard code that into the static resource produced.

Because the standard practice is to have the static GUI served by Odin Control, this additional production file is not usually needed, as left blank it will connect to its own server. However, if a static GUI needs to connect to other Odin Control instances than the one serving it, this `env` file should be created before compilation.

These files can also be used to define other environment variables for other purposes, if required. Vite can import and use any variable defined in these files that have the `VITE_` prefix.


<br></br>

---
# FAQ and Common Issues


### The Adapter is running, and the endpoint adapter is definitely pointing at the correct address/port, but I'm still getting network errors.

- It's likely that you have not enabled CORS on your Odin Control instance, which means that the server is refusing the responses from another server. Check your Odin Control config file and ensure `enable_cors = true` is present in the server config.

### Everything looks bad and/or weird.

- Check the CSS imports. You may have removed or changed the import of the bootstrap CSS file from the template, or forgotten it if you are not using the template.
- Are you importing a custom CSS file in a component? It may be that the CSS imported is overwriting the Bootstrap CSS that provides a lot of the standard styling for Odin React. [Check the Section about CSS Styling](#custom-css-styling)