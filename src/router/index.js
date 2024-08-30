import { createRouter, createWebHistory } from 'vue-router';
import Popup from '../popup/pages/Popup.vue';
import App from "../popup/App.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: App
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;