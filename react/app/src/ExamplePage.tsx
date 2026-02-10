

import { TitleCard, EndpointButton, EndpointInput, type AdapterEndpoint_t } from "odin-react";

/**
 * These imports below bring components from Bootstrap React into the page, that are designed
 * to help create a good layout for the application.
 * The whole page is contained within a Container Component as all React Components
 * must have a single Root Parent Element (meaning the return statement should return
 * a single element that then contains the rest of the page as its children)
*/
import { Container, Row, Col, InputGroup, Button, Stack } from "react-bootstrap";

import styles from "./style.module.css";

import type { WorkshopParams } from "./WorkshopParams";
import { useState } from "react";
import { ExampleDisplayParam, ExampleWithEndpoint } from "./ExampleComponents";

/**
 * This typescript interface defines what Properties the Example Page accepts.
 * 
 * Any Property defined with a question mark is an Optional Property and doesn't HAVE
 * to be defined (such as the Title Property in this interface)
 */
interface ExamplePageProps {
  endpoint: AdapterEndpoint_t<WorkshopParams>,
  title ?: string
}

/**
 * All modern React Components are Functional Components, meaning they behave as a Function
 * that gets called, and returns its JSX Elements
 * @returns 
 */
export const ExamplePage: React.FC<ExamplePageProps> = ({endpoint, title}) => {


  /**
   * An Example State in the ExamplePage Component, to demo how to use the useState hook
   */
  const [exampleState, setExampleState] = useState<number>(0);

  return (
    <Container>
      <Stack>
      {/* You can Conditionally include parts of the JSX if certain variables/props are true, or defined, like this Conditional Title Row 
          If the Title prop gets set by this page's parent, it'll render an extra row to display it. Try adding it in App.tsx!*/}
      {title && <h1>{title}</h1>}
      <TitleCard title="Displaying an Adapter Parameter">
        <Stack>
          <ExampleDisplayParam/>
          <hr/>
          <ul>
            <li>
            Parameters can be read out of the <code>AdapterEndpoint.data</code> nested dictionary
            using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#dot_notation">Dot Notation</a>
            </li>
            <li>
            If the parameter is not guaranteed to exist, its important to provide an alternate value to render.
            <ul><li>
              Here, this is done using a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing">
              Nullish Coalescing Operator
              </a>
              : <code>??</code>
              <ul><li>
                If the left side of the Operator (<code>endpoint.data.rand_num</code>) is <b>Null</b> or <b>Undefined</b>, it instead returns the Right side (<code>"undefined"</code>)
              </li></ul>
            </li></ul>
            </li>
            <li>
              The part that gets the data to display is contained within <b>Curly Brackets</b>. Without this, the HTMl would just display the whole thing as plaintext:
              endpoint.data.rand_num ?? "undefined"
            </li>
          </ul>
        </Stack>
      </TitleCard>
      <TitleCard title="Setting Parameters using WithEndpoint Components">
        <Stack>
          <ExampleWithEndpoint/>
          <hr/>
          <ul>
            <li>
              PUT requests to the Adapter can be set using <code>WithEndpoint</code> components, such as this <code>EndpointInput</code>
            </li>
            <li>
              These components have two required Properties that must be provided:
              <ul>
                <li><code>endpoint</code>: The AdapterEndpoint component that handles the HTTP requests</li>
                <li><code>fullpath</code>: the full, backslash separated path to the Parameter on the tree</li>
              </ul>
            </li>
            <li>
              Other Optional Properties can also be provided. A full list is available on the <a href="https://github.com/stfc-aeg/odin-react/wiki/WithEndpoint#properties">
              Odin React Wiki</a>
            </li>
            <li>
              These Components make an assumption about what should trigger the PUT requests based on the type of component
              <ul>
                <li>
                  Button based components, radio buttons and checkboxes will trigger when clicked
                </li>
                <li>
                  Textbox and number inputs will trigger when the Enter key is pressed while the textbox is Focused
                </li>
                <li>
                  Sliders and dropdown menus will trigger when the value is changed.
                </li>
              </ul>
            </li>
            <li>
              Properties that the normal component accept can still be passed to the special Endpoint version. For instance, <code>type="number"</code> can
              still be provided to the <code>EndpointInput</code> object to set it as a number input, providing the arrows to change the number
            </li>
            <li>
              If the Parameter has Metadata that limits the possible values, the Endpoint Components will check and uphold those limits.
              For instance, the <code>num_val</code> parameter modified by the example here has a <b>Minimum and Maximum</b> set by the Metadata.
              Try and use the arrow buttons on the input to reduce the value below <b>15</b>, or manually type a lower value and hit enter, to see what happens.
            </li>
          </ul>
        </Stack>
      </TitleCard>
      <TitleCard title="Using State">
        <Row>
        <Col className={styles.exampleCol} md="4">
          {/* STATE IS OUTSIDE THE RETURN PART OF THE COMPONENT ABOVE */}
          <InputGroup>
          <Button onClick={() => setExampleState(x => x + 1)}>Increment State: {exampleState}</Button>
          </InputGroup>
        </Col>
        <Col>
          <pre className={styles.codeBlock}>
            
          </pre>
        </Col>
        </Row>
      </TitleCard>
      </Stack>
    </Container>
  )
}