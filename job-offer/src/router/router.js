import { createRouter, createWebHistory } from 'vue-router'
import JobOffersApp from '../JobOffersApp.vue'
import MainPage from '../views/MainPage.vue'
import CommentsApp from '../CommentsApp.vue'
import CommunityPage from '../views/CommunityPage.vue'
import PostPage from '../views/PostPage.vue'
import NotePanel from '../components/NotePanel.vue'
import JobDetailPage from '../views/JobDetailPage.vue'

// 路由信息
const routes = [
    {
        path: "/",
        component: JobOffersApp
    },
    {
        path: "/jobs",
        component: MainPage
    },
    {
        path: "/comments",
        component: CommentsApp
    },
    {
        path: "/community",
        component: CommunityPage
    },
    {
        path: "/community/post/:postId",
        name: "post",
        component: PostPage
    },
    {
        path: "/note",
        name: "note",
        component: NotePanel
    },
    {
        path: "/jobs/:jobId/detail",
        name: "detail",
        component: JobDetailPage
    }
];

// 导出路由
export default createRouter({
    history: createWebHistory(),
    routes
})
