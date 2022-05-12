import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/:userId" component={ProfilePage}/> 
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
