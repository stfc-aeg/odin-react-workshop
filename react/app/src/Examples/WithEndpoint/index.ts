import desc from "./desc.md"

const code = `const ExampleWithEndpoint = () => {
  const endpoint = useAdapterEndpoint("reactworkshop", "http://localhost:8888");

  return (
    <>
      <InputGroup>
        <InputGroup.Text>Input String</InputGroup.Text>
        <EndpointInput endpoint={endpoint} fullpath="string_val"/>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Input Number</InputGroup.Text>
        <EndpointInput endpoint={endpoint} fullpath="num_val" type="number"/>
      </InputGroup>
    </>
  );
};

render(<ExampleWithEndpoint />)
`

export {code as WithEndpointCode, desc as WithEndpointDesc}