**PUT** requests to the Adapter can be handled by `WithEndpoint` components, such as the `EndpointInput`. These allow a user to see and modify the parameter specified.

These components have two required *Properties* that must be provided:
- `endpoint`: the AdapterEndpoint object that handles the HTTP requests to the **Odin Control Adapter**.
- `fullpath`: The backslash separated path to the Parameter on the adapter's tree.

Other *Optional Properties* can also be provided for further customisation. A full list is available on the [Odin React Wiki](https://github.com/stfc-aeg/odin-react/wiki/WithEndpoint#properties).

> This includes any *Properties* the actual component might accept. For instance, `type="number"` can still be provided to the `EndpointInput` component to set it to a *number input*, providing arrows to change the value and disallowing text input.

These Components make an assumption about what should trigger the **PUT** requests based on the type of component used:

- **Button** based components, radio buttons and checkboxes will trigger when clicked
- **Textbox inputs**, for strings and for numbers as in this example, will trigger when the Enter key is pressed while the component is *Focused* (This means while the editing cursor is flashing inside the textbox)
- **Dropdown Menuts** and **sliders** will trigger when the value is changed

If the Parameter has Metadata provided by the Adapter that limits the possible values, the Endpoint Component will uphold these limits before trying the **PUT** request.
> For instance, the `num_val` parameter used by the example here has a `min` and `max` value set in the metadata. Attempting to set the value outside these limits will fail and display an error, without trying the **PUT** Request.