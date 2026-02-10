The [useState](https://react.dev/reference/react/useState) hook can be used to give a component *memory*, allowing it to keep a variable between renders.
> Standard local variables do not persist between Renders, so using something like `let value = 0` would lose any changes made whenever react renders the component again.

As shown, `useState` returns two values:
- The **current State**, which gets initialised to the value provided to the `useState` hook
- a **Set Function** that lets you update the state to a new value and trigger a re-render

This has many uses, the one in this example showing that it allows the value to be kept in the React App and provided to the `EndpointButton` component as a value. This would allow modifications to be made to the value before sending it to the Adapter.
> For example, you may want multiple text boxes for multiple parameters, and a single "Submit" button that sends all the parameters in a single **PUT** request.

This example also demonstrates how to create custom **Event Handlers** that run when events, such as a textbox value changing, occur. The example handler checks that the textbox has a valid `value` and modifies the `State Variable` with the new value.

Note that the textbox component uses the **state** as its *value*. This makes it what React considers a [Controlled Component](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable), meaning React will force the textbox to always have the value Passed. React will show a warning in the console if a **controlled component** has no way of changing it's value (with an Event Handler)