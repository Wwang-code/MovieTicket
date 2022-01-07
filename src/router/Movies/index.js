export default {
    path: '/movies',
    component: () => import('@/views/Movies'),
    children: [
        {
            path: '',
            redirect: 'playing'
        },
        {
            path: 'city',
            component: () => import('@/components/Home/City.vue') 
        },
        {
            path: 'playing',
            components: { movieView: () => import('@/components/Movie/Playing.vue') }
        },
        {
            path: 'comingsoon',
            components: { movieView: () => import('@/components/Movie/ComingSoon.vue') }
        }
    ]
}