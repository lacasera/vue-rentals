import Login from '@/views/auth/Login'
import Signup from '@/views/auth/Signup'
import Home from '@/views/dashboard/Home'
import Listing from '@/views/dashboard/Listing'
import AddListing from '@/views/dashboard/AddListing'
import MyListings from '@/views/dashboard/MyListings'
import EditListing from '@/views/dashboard/EditListing'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/signup',
    component: Signup,
    name: 'signup'
  },
  {
    path: '/listing/:slug',
    component: Listing,
    name: 'listing'
  },
  {
    path: '/listing/:id/edit',
    component: EditListing,
    name: 'edit-listing',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/listings/add',
    component: AddListing,
    name: 'add-listing',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/my/listings',
    component: MyListings,
    name: 'my-listings',
    meta: {
      requiresAuth: true
    }
  }
]

export default routes
