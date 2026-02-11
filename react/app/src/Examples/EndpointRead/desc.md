Parameters can be read out of the `AdapterEndpoint.data` nested dictionary using [Dot Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation).

Parameters are not guarenteed to exist in this dictionary, especially when the GUI first loads and the connection is not yet established, so it's important to provide an alternative fallback value to render.
> We do this using a [Nullish Coalescing Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) : `??`

If the left side of the Operator (`endpoint.data.rand_num`) is **Null** or **Undefined**, it instead returns the Right side (`"undefined"`)

The part that gets the data to display is contained within **Curly Brackets**, telling React that this is code to be executed and not just a plain string. Without this, the HTML would just show the actual string: *endpoint.data.rand_num ?? "undefined"*

You can also see in this example that the `useAdapterEndpoint` hook has been provided with an *interval* of 1000 milliseconds. This means the `AdapterEndpoint` returned by this hook will send a **GET** request to the Adapter every 1000 milliseconds to get the updated Parameter values (a sort of Polling Loop). Without this, it would never update the value and the display would not update.