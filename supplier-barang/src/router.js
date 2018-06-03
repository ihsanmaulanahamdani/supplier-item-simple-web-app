import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Item from './views/Item.vue'
import Supplier from './views/Supplier.vue'
import SupplierEdit from './views/EditSupplier.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/items',
      name: 'items',
      component: Item
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: Supplier
    },
    {
      path: '/suppliers/edit',
      name: 'suppliers-edit',
      component: SupplierEdit
    }
  ]
})
