import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './views/Profile'
import Users from './views/Users/Users'
import AddUser from './views/Users/AddUser'

const routes = [
  {
    collapse: false,
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/public',
    state: 'loginCollapse',
    hide: false,
    exact: false,
  },
  {
    collapse: false,
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/public',
    state: 'registerCollapse',
    hide: false,
    exact: false,
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: 'ni ni-tv-2 text-primary',
  //   component: null,
  //   layout: '/admin',
  //   hide: false
  // },
  {
    path: '/profile',
    name: 'Profile',
    icon: 'ni ni-circle-08 text-primary',
    component: Profile,
    layout: '/admin',
    state: 'profileCollapse',
    hide: false,
    exact: false,
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'ni ni-collection text-primary',
    component: Users,
    layout: '/admin',
    state: 'usersCollapse',
    hide: false,
    exact: false,
  },
  {
    path: '/users/add-user',
    name: 'Add User',
    icon: 'ni ni-fat-add text-primary',
    component: AddUser,
    layout: '/admin',
    state: 'addUsersCollapse',
    hide: true,
    exact: false,
  },
]

export default routes
