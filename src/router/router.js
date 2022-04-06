import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/view/index/index'),
    },
    {
        path: '/comment',
        name: 'Comment',
        component: () => import('@/view/comment/comment'),
    },
    {
        path: '/content',
        name: 'Content',
        component: () => import('@/view/content/content'),
    },
    {
        path: '/my',
        name: 'My',
        component: () => import('@/view/my/my'),
    },

];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};
