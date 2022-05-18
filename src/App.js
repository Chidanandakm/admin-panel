import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Home, List, Login, New, Single } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":id" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
          <Route path="articles">
            <Route index element={<List />} />
            <Route path=":id" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
