import TodoPage from './pages/TodoPage';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Show from './pages/Show';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={TodoPage} />
          <Route path='/:id' component={Show} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
