import React from 'react';
const Home = React.lazy(() => import('./home/Home'));
const List = React.lazy(() => import("./list/UserList"));
const Login = React.lazy(() => import("./login/Login"));
const UpdateUser = React.lazy(() => import("./new/UpdateUser"));
const Single = React.lazy(() => import("./single/Single"));
const NewUser = React.lazy(() => import("./new/NewUser"));
const Profile = React.lazy(() => import("./profile/Profile"));
const ArticleList = React.lazy(() => import("./list/ArticleList"));
const NewArticle = React.lazy(() => import("./new/NewArticle"));
const EditArticle = React.lazy(() => import("./new/EditArticle"));
const CategoryList = React.lazy(() => import("./list/CategoryList"));
const NewCategory = React.lazy(() => import("./new/NewCategory"));
const UpdateCategory = React.lazy(() => import("./new/UpdateCategory"));
const RequestPasswordRecovery = React.lazy(() => import("./login/RequestPasswordRecovery"));
const ResetPassword = React.lazy(() => import("./login/ResetPassword"));



export { Home, List, NewArticle, RequestPasswordRecovery, ResetPassword, EditArticle, CategoryList, NewCategory, UpdateCategory, Login, UpdateUser, Single, NewUser, Profile, ArticleList };