import 'bootstrap/dist/css/bootstrap.min.css';

import { OdinApp, useAdapterEndpoint } from 'odin-react';
import { WorkshopPage } from './WorkshopPage';
import { ExamplePage } from './ExamplePage';
import { type WorkshopParams } from './WorkshopParams';
import { PlaygroundPage } from './PlaygroundPage';

const App: React.FC = () => {

  const endpoint = useAdapterEndpoint<WorkshopParams>("reactworkshop", import.meta.env.VITE_ENDPOINT_URL, 1000);

  return (
    <OdinApp title='React Workshop' navLinks={["Workshop Page", "Example Page", "Playground"]}>
      {/* Add pages as children of the OdinApp component. Add a nav link to each page in the navLinks
          prop of OdinApp*/}
      <WorkshopPage/>
      <ExamplePage/>
      <PlaygroundPage endpoint={endpoint}/>
    </OdinApp>
  )
}

export default App
