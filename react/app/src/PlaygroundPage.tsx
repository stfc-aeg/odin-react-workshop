import type React from "react";

import { LiveProvider, LivePreview, LiveEditor, LiveError } from "react-live";

import {Container, Row, Col, Badge, Button, InputGroup} from 'react-bootstrap';
import { EndpointInput, TitleCard, useAdapterEndpoint, type AdapterEndpoint } from "odin-react";
import type { WorkshopParams } from "./WorkshopParams";


const stateScope = {useAdapterEndpoint, EndpointInput, InputGroup};

export const PlaygroundPage: React.FC<{endpoint: AdapterEndpoint<WorkshopParams>}> = ({endpoint}) => {
  
  const code = `<Badge>Random Number: {endpoint.data.rand_num ?? "undefined"}</Badge>`;
  const scope = {Badge, endpoint};

  const stateCode = `
const ExampleWithEndpoint = () => {
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
    <Container>
      <TitleCard title="Parameter Display">
      <LiveProvider code={code} scope={scope}>
        <Row>
          <Col>
            <LivePreview/>
            <LiveError/>
          </Col>
          <Col>
            <LiveEditor/>
          </Col>
        </Row>

      </LiveProvider>
      </TitleCard>
      <TitleCard title="State">
      <LiveProvider code={stateCode} scope={stateScope} noInline>
        <Row>
          <Col>
            <LivePreview/>
            <LiveError/>
          </Col>
          <Col>
            <LiveEditor/>
          </Col>
        </Row>

      </LiveProvider>
      </TitleCard>
    </Container>
  )
}