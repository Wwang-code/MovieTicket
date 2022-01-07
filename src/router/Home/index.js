export default {
    path: '/home',
    component: () => import('@/views/Home'),
    children:[
        {
            path:'city',
            component:()=>import('@/components/Home/City.vue')
        },
        {
            path:'search',
            component:()=>import('@/components/Home/Search.vue')
        }
    ]
}