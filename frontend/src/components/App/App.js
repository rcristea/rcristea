import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LandingPage from '../LandingPage/LandingPage'
import TodoIndex from '../Tests/TodoIndex/TodoIndex'
import TodoAdd from '../Tests/TodoAdd/TodoAdd'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />

        <Route exact path='/todo' component={TodoIndex} />
        <Route exact path='/todo/add' component={TodoAdd} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
