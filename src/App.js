import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from "./contexts/auth";

//components
import NavbarComponent from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

//pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
import Category from './pages/Category';

import { PrivateRoute } from "./PrivateRoute";


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <NavbarComponent />

          <div className="content">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path="/about"><About /></Route>
              <Route path="/contact"><Contact /></Route>
              <Route path="/pets"><Pets /></Route>
              <Route path="/details/:id"><PetDetails /></Route>
              <Route path="/category/:id"><Category /></Route>
              <Route path="/login"><Login /></Route>
              <Route path="/registration"><Register /></Route>
              <PrivateRoute path="/admin" component={Dashboard} />
              {/* cijeli folder za admin kopiran */}
              {/*   <Route path="/admin"><Admin /></Route> */}


            </Switch>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
