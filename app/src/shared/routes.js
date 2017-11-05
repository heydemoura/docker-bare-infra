/**
 * Routes configuration
 * @module reactapp/routes
 **/
import Home from "./pages/Home";
import User from "./pages/User";
import UserRepos from "./pages/UserRepos";

export default [
  {
    path: "/",
    exact: true,
    component: Home,
    loadData: () => ({})
  },
  {
    path: "/user/:username",
    exact: true,
    component: User,
    loadData: User.fetchInitialState
  },
  {
    path: "/user/:username/repos",
    exact: true,
    component: UserRepos,
    loadData: UserRepos.fetchInitialState
  }
];
