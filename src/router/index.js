import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('../views/home/Home')
const Cart = ()=>import('../views/cart/Cart')
const Category = ()=>import('../views/category/Category')
const Profile = ()=>import('../views/profile/Profile')
const Detail = ()=>import('../views/detail/Detail')

//1.安装插件
Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        meta:{
            show_mainTabBar:true
        }
    },
    {
        path:'/cart',
        component:Cart,
        meta:{
            show_mainTabBar:true
        }
    },
    {
        path:'/category',
        component:Category,
        meta:{
            show_mainTabBar:true
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            show_mainTabBar:true
        }
    },
    {
        path:'/detail/:iid',
        component:Detail,
        meta:{
            show_mainTabBar:false
        }
    }
]

//2.创建router
const router = new VueRouter({
    routes,
    mode:'history'
})

export default router