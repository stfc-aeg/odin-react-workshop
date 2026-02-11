import desc from "./desc.md"

const code = `const ExampleUseState = () => {

    //Create a State Variable, initialised to 0
    const [exampleUseState, setExampleState] = useState(0);

    const endpoint = useAdapterEndpoint("reactworkshop", "http://localhost:8888");

    const onChangeHandler = (event: React.ChangeEvent) => {
        const target = event.target;
        let val = 0;
        if("value" in target && target.value != null){
            val = target.value as number;
        }
        setExampleState(val);
    }
    return (
        <>
            <InputGroup>
                <InputGroup.Text>Input</InputGroup.Text>
                <Form.Control type="number" value={exampleUseState}
                onChange={onChangeHandler}/>
                <EndpointButton endpoint={endpoint} fullpath="num_val" value={exampleUseState}>
                    Click to Submit
                </EndpointButton>
            </InputGroup>
        </>
    )
};

render(<ExampleUseState/>);`;

export {code as UseStateCode, desc as UseStateDesc};