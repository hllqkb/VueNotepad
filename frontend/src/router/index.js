import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/common/Home.vue';
import NoteDetail from '@/components/NoteDetail.vue';
import Calendar from '../components/page/Calendar.vue';
import Profile from '../components/page/Profile.vue';
import ModifyUser from '../components/page/ModifyUser.vue';
import ModifyPassword from '../components/page/ModifyPassword.vue';
import ModifyAvatar from '../components/page/ModifyAvatar.vue';
import Register from '../components/page/Register.vue';
import Login from '../components/page/Login.vue';
import AiChat from '../components/page/AiChat.vue';
import AddNote from '../components/page/AddNote.vue';
const routes = [
    { path: '/', component: Home },
    { path: '/notes/:id', name: 'NoteDetail', component: NoteDetail },
    { path: '/calendar', component: Calendar },
    { path: '/profile', component: Profile },
    { path: '/modifyUser', component: ModifyUser },
    { path: '/modifyPassword', component: ModifyPassword },
    { path: '/modifyAvatar', component: ModifyAvatar },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/ai', component: AiChat },
    { path: '/addNote', component: AddNote }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
