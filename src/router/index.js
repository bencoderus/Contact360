import Home from '../views/Home.vue'
import Pagenotfound from '../views/Pagenotfound.vue'
import Register from '../views/auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Newcontact from '../views/contact/New.vue'
import Showcontact from '../views/contact/Show.vue'
import Editcontact from '../views/contact/Edit.vue'



//middleware
const guest = (to, from, next) => {
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  if ((!user) && (!token)) {
    next('/')
  }
  next()
}

const auth = (to, from, next) => {
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  if ((user) && (token)) {
    next('/dashboard')
  }
  next()
}



const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: auth
  },
  {
    path: '*',
    name: 'Pagenotfound',
    component: Pagenotfound
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: auth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: guest
  },
  {
    path: '/contact/new',
    name: 'New',
    component: Newcontact,
    beforeEnter: guest
  },
  {
    path: '/contact/show',
    name: 'Showcontact',
    component: Showcontact,
    beforeEnter: guest
  },
  {
    path: '/contact/edit',
    name: 'Editcontact',
    component: Editcontact,
    beforeEnter: guest
  }

]


export default routes