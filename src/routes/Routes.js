import { BrowserRouter, Routes, Route} from "react-router-dom";
import List from '../views/List';

export default function RoutesNav (){
    return (
        <BrowserRouter>
            <Routes>
          <Route exact path="/" component={<List/>} />
          <Route exact path="/list" component={<List/>} />
          </Routes>
    </BrowserRouter>
    );
  }

  //export default RoutesNav;