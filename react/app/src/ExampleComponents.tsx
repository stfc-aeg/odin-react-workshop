
import { EndpointInput, useAdapterEndpoint, type AdapterEndpoint_t } from 'odin-react';

/**
 * Live Code Editor and display
 */
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

import {Badge, Row, Col, InputGroup, Button} from 'react-bootstrap';

import styles from "./style.module.css";
import { useState } from 'react';

const scope = {useAdapterEndpoint, EndpointInput, InputGroup, Badge, Button, useState};

const ExampleDisplayParam: React.FC = () => {
  
  const code = `const ExampleEndpointRead = () => {
  const endpoint = useAdapterEndpoint("reactworkshop", "http://localhost:8888", 1000);

  return (
    <Badge>Random Number: {endpoint.data.rand_num ?? "undefined"}</Badge>
  );
};

render(<ExampleEndpointRead />)`
  
  
  return (
    <LiveProvider code={code} scope={scope} disabled noInline>
      <Row>
        <Col className={styles.exampleCol} md="4">
          <LivePreview/>
          <LiveError/>
        </Col>
        <Col>
          <LiveEditor className={styles.codeBlock}/>
        </Col>
      </Row>
    </LiveProvider>
  )
}

const ExampleWithEndpoint: React.FC = () => {

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

  return (
    <LiveProvider code={code} scope={scope} disabled noInline>
      <Row>
        <Col className={styles.exampleCol} md="4">
          <LivePreview/>
          <LiveError/>
        </Col>
        <Col>
          <LiveEditor className={styles.codeBlock}/>
        </Col>
      </Row>
    </LiveProvider>
  )
}

const ExampleUseState: React.FC = () => {

  const code = '';
  const [exampleState, setExampleState] = useState<number>(0);

  return (
    <>
      <InputGroup>
        <Button onClick={() => setExampleState(x => x + 1)}>
          Increment State: {exampleState}
        </Button>
      </InputGroup>
    </>
  )
}

export {ExampleDisplayParam, ExampleWithEndpoint}