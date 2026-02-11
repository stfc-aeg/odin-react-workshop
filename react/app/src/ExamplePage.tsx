import { useAdapterEndpoint, EndpointInput, EndpointButton, TitleCard } from 'odin-react';
import { useState } from 'react';

import {Container, Stack, Badge, InputGroup, Form}  from 'react-bootstrap';

import { ExampleComponent } from './Examples/ExampleComponent';

import { EndpointReadCode, EndpointReadDesc } from './Examples/EndpointRead';
import { WithEndpointCode, WithEndpointDesc } from './Examples/WithEndpoint';
import { UseStateCode, UseStateDesc } from './Examples/UseState';
import { ErrorHandlingCode, ErrorHandlingDesc } from './Examples/ErrorHandling';



import styles from "./Examples/style.module.css";

const scope = {
    useAdapterEndpoint, EndpointInput, EndpointButton,
    useState,
    Badge, InputGroup, Form,

};

export const ExamplePage: React.FC = () => {

    return (
        <Container>
            <Stack>
                <TitleCard>
                    <div className={styles.markdown}>
                    <p>
                        This page shows various interactive examples of Odin React components, and the source code for those examples.
                    </p>
                    <blockquote>
                        <p>
                            Note that the examples use a method at the end called <code>render</code> to display the components.
                            This is a part of the library that allows the examples to display both interactive components and
                            the source code, and is not normally used.
                        </p>
                        <p>
                            This also causes a warning in the console about <code>using an outdated JSX transform</code>. This warning can be ignored.
                        </p>
                    </blockquote>
                    </div>
                </TitleCard>
                <hr/>
                <ExampleComponent title="Displaying an Adapter Parameter" markdown={EndpointReadDesc}
                                  code={EndpointReadCode} scope={scope}/>
                <ExampleComponent title="Setting Parameters using WithEndpoint Components"
                                  markdown={WithEndpointDesc} code={WithEndpointCode}
                                  scope={scope}/>
                <ExampleComponent title="Using State with Odin React"
                                  markdown={UseStateDesc} code={UseStateCode}
                                  scope={scope}/>
                <ExampleComponent title="Handling Errors" markdown={ErrorHandlingDesc}
                                  code={ErrorHandlingCode} scope={scope}/>
            </Stack>
        </Container>
    )
}