import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Newcontact from '../views/New.vue'
import Showcontact from '../views/Show.vue'
import Editcontact from '../views/Edit.vue'



//middleware
const guest = (to, from, next) => {
let token = localStorage.getItem('token');
let user = localStorage.getItem('user');
if((!user) && (!token)){
  next('/')
}
next()
}

const auth = (to, from, next) => {
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  if((user) && (token)){
    next('/dashboard')
  }
  next()
  }
  


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: auth
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
