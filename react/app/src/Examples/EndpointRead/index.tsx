import desc from "./desc.md"

const code = `const ExampleEndpointRead = () => {
  const endpoint = useAdapterEndpoint("reactworkshop", "http://localhost:8888", 1000);

  return (
    <Badge>Random Number: {endpoint.data.rand_num ?? "undefined"}</Badge>
  );
};

render(<ExampleEndpointRead />)`

export {desc, code}