
import { TitleCard } from 'odin-react';

/**
 * Live Code Editor and display
 */
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

/**
 *  Markdown Parser
 */
import Markdown from 'react-markdown';

import {Row, Col, Stack, Accordion} from 'react-bootstrap';

import styles from "./style.module.css";
import { type ComponentProps } from 'react';

interface ExampleComponentProps {
  title: ComponentProps<typeof TitleCard>["title"],
  code: string,
  scope: ComponentProps<typeof LiveProvider>["scope"],
  markdown: string
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({code, scope, title, markdown}) => {

  return (
    <TitleCard title={title}>
      <Stack>
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
      <hr/>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Description</Accordion.Header>
          <Accordion.Body className={styles.markdown}>
            <Markdown>
              {markdown}
            </Markdown>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </Stack>
    </TitleCard>
  )
}



export {ExampleComponent}