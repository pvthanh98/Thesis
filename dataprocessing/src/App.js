import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './views/home';
import StoreComment from './views/store_comments';
import ServiceComment from './views/service_comment';
import Bill from './views/add_bill';
const App = () => {
  return (
    <Router>  
      <Switch>
        <Route path="/store_comment" component={StoreComment} />
        <Route path="/service_comment" component={ServiceComment} />
        <Route path="/bill" component={Bill} />
        <Route path="/" component={Home} />
        {/* <Route path="/service_comment" /> */}
      </Switch>
    </Router>
  )
}

export default App;