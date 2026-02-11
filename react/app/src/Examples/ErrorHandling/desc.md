Both these buttons cause an Error to occur with the `Odin Control Adapter`. Clicking either will display an error message in the top of the screen. A list of all Errors that have occured can be seen by clicking the **Red Exclamation Button** in the Nav Bar. These errors can be cleared by clicking the button within that dropdown.

You can also see the errors in **Odin Control** if you check the terminal running the *workshop adapter*, as it is set up to log any errors like this.

This error handling will also occur if the adapter is not running, or if you attempt to set a parameter to an invalid value.

Having an Adapter return errors when something goes wrong with a GET or PUT request like this is a good way to ensure users know when something is wrong.

> You may notice that the *invalid path* error thrown by the button does not exactly match the path provided. That is because the `EndpointButton` knows to split the last part of the path off for a **PUT** request and create a **JSON Object** to send to the Adapter.
>
> This behaviour will change with the release of **Odin Control 2.0** and changes will be made to **Odin React** to reflect this.