import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import RegisterLayout from "../layouts/RegisterLayout.vue";
import Form from "../views/Form.vue";

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: Home,
            }
        ],
    },
    {
        path: '/reg',
        component: RegisterLayout,
        children: [
            {
                path: '',
                component: Form,
            }
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router