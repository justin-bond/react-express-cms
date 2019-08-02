// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import Person from "@material-ui/icons/AccountBox"
import Persons from "@material-ui/icons/SupervisorAccount"
import Done from "@material-ui/icons/Done"

// core components/views for Admin layout
import DashboardPage from "./views/Dashboard"
import UserProfile from "./views/UserProfile"
import UsersPage from "./views/Users"
import TasksPage from "./views/Tasks"


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: Persons,
    component: UsersPage,
    layout: "/admin"
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: Done,
    component: TasksPage,
    layout: "/admin"
  },
];

export default dashboardRoutes;