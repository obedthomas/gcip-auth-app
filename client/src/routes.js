import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Profile from './views/Profile'
import Users from './views/Users/Users'

const routes = [
  {
    collapse: false,
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/public',
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
    hide: false,
    exact: false,
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: 'ni ni-circle-08 text-primary',
    component: Profile,
    layout: '/admin',
    hide: false,
    exact: false,
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'ni ni-collection text-success',
    component: Users,
    layout: '/admin',
    hide: false,
    exact: false,
  },
  {
    path: '/companies',
    name: 'Companies',
    icon: 'ni ni-building text-warning',
    component: Users,
    layout: '/admin',
    hide: false,
    exact: false,
  },
]

export default routes
