import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

export const API_URL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage} />
          <Route path="/:userId" component={ProfilePage}/> 
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
