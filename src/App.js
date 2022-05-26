import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Loading } from "./components";

import { ArticleList, CategoryList, EditArticle, Home, List, Login, NewArticle, NewCategory, NewUser, Profile, UpdateCategory, UpdateUser } from "./pages";

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path='/'  >
            <Route path='login' element={<Login />} />
            <Route index element={isLoggedIn ? <Home /> : <Navigate to={'/login'} />} />
            <Route path="users">
              <Route index element={isLoggedIn ? <List /> : <Navigate to={'/login '} />} />
              <Route path="me" element={<Profile />} />
              <Route path=":id" element={<UpdateUser />} />
              <Route path="new" element={<NewUser />} />
            </Route>
            <Route path="articles">
              <Route index element={<ArticleList />} />
              <Route path=":id" element={<EditArticle />} />
              <Route path="new" element={<NewArticle />} />
            </Route>
            <Route path="categories">
              <Route index element={<CategoryList />} />
              <Route path=":id" element={<UpdateCategory />} />
              <Route path="new" element={<NewCategory />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
