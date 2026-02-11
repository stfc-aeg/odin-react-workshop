import desc from "./desc.md"

const code = `const ExampleEndpointRead = () => {
  /**
   * create an endpoint with:
   * an Adapter Name of "reactworkshop"
   * a url of "http://localhost:8888"
   * an Interval of 1000 milliseconds
   */
  const endpoint = useAdapterEndpoint("reactworkshop", "http://localhost:8888", 1000);

  return (
    <Badge>Random Number: {endpoint.data.rand_num ?? "undefined"}</Badge>
  );
};

render(<ExampleEndpointRead />)`

export {code as EndpointReadCode, desc as EndpointReadDesc}