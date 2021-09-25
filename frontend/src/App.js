import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './assets/css/portfolio.css'

import Portfolio from './views/Portfolio'
import TodoIndex from './components/Tests/TodoIndex/TodoIndex'
import TodoAdd from './components/Tests/TodoAdd/TodoAdd'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={(props) => <Portfolio {...props} />} />
        <Route exact path='/todo' component={TodoIndex} />
        <Route exact path='/todo/add' component={TodoAdd} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
