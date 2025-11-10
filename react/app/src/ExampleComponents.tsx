
import { type AdapterEndpoint_t } from 'odin-react';

import {Badge} from 'react-bootstrap';

function ExampleDisplayParam(props: {endpoint: AdapterEndpoint_t<{rand_num: number}>}) {
  
  return (
    <Badge>Random Number: {props.endpoint.data.rand_num ?? "undefined"}</Badge>
  )
}

export {ExampleDisplayParam}