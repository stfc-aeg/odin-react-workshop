import desc from "./desc.md"

const code = `const ExampleErrorHandling = () => {

    const endpoint = useAdapterEndpoint("reactworkshop", "http://localhost:8888");

    return (
        <>
          <EndpointButton endpoint={endpoint} fullpath="not/a/real/path" value={true}>
            Click to PUT to invalid path
          </EndpointButton>
          <EndpointButton endpoint={endpoint} fullpath="broken" value={true}>
            Click to PUT to Error Raising Param
          </EndpointButton>
        </>
    );
};

render(<ExampleErrorHandling />)
`;

export { code as ErrorHandlingCode, desc as ErrorHandlingDesc }