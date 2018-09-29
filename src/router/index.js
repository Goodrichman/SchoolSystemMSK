import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Login = () => import('@/views/auth/Login')
const NotFound = () => import('@/views/auth/Page404')

Vue.use(Router)

var router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        
      ]
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: Login
    } ,
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  if( to.path != "/auth/login" ){
    if (localStorage.getItem('auth-token') == null) {
      next({
        path: '/auth/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      next();
    }
  }else{
    next();
  }
})

export default router;
