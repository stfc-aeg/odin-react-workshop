import 'bootstrap/dist/css/bootstrap.min.css';

import { OdinApp, useAdapterEndpoint } from 'odin-react';
import { WorkshopPage } from './WorkshopPage';
import { ExamplePage } from './ExamplePage';

const App: React.FC = () => {

  const endpoint = useAdapterEndpoint("reactworkshop", import.meta.env.VITE_ENDPOINT_URL, 1000);

  return (
    <OdinApp title='React Workshop' navLinks={["Workshop Page", "Example Page"]}>
      {/* Add pages as children of the OdinApp component. Add a nav link to each page in the navLinks
          prop of OdinApp*/}
      <WorkshopPage/>
      <ExamplePage endpoint={endpoint}/>
    </OdinApp>
  )
}

export default App
