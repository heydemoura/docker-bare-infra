import Home from "./pages/Home";
import User from "./pages/User";
import UserRepos from "./pages/UserRepos";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/user/:username?",
    exact: true,
    component: User
  },
  {
    path: "/user/:username?/repos",
    exact: true,
    component: UserRepos
  }
];

export default routes;
