import { createRouter, createWebHistory } from 'vue-router'
import JobOffersApp from '../JobOffersApp.vue'
import MainPage from '../views/MainPage.vue'
import CommentsApp from '../CommentsApp.vue'
import CommunityPage from '../views/CommunityPage.vue'
import PostPage from '../views/BlogPage.vue'
import NotePanel from '../components/NotePanel.vue'
import JobDetailPage from '../views/JobDetailPage.vue'
import EditorPage from '../views/EditorPage.vue'
import MessageComp from '../components/MessageComp.vue'
import ProfilePage from '../views/ProfilePage.vue'
import JobEditorComp from '../components/JobEditorComp.vue'
import { ref } from 'vue';

const token = ref(window.sessionStorage.getItem("user_id"));

const authCheck = () => {
    console.log(token);
    if (token.value === '' || token.value === null || token.value === undefined){
        alert('请先登录！');
        return false;
    }
}

// 路由信息
const routes = [
    {
        path: "/",
        name: "index",
        component: JobOffersApp
    },
    {
        path: "/jobs",
        component: MainPage,
    },
    {
        path: "/comments",
        component: CommentsApp,
        beforeEnter: [authCheck]
    },
    {
        path: "/community",
        component: CommunityPage,
    },
    {
        path: "/community/blog/:blogId",
        name: "blog",
        component: PostPage,
    },
    {
        path: "/note",
        name: "note",
        component: NotePanel,
        beforeEnter: [authCheck]
    },
    {
        path: "/jobs/:jobId/detail",
        name: "detail",
        component: JobDetailPage,
        beforeEnter: [authCheck]
    },
    {
        path: "/editor/drafts",
        name: "editor",
        component: EditorPage,
        beforeEnter: [authCheck]
    },
    {
        path: "/msg",
        component: MessageComp,
        beforeEnter: [authCheck]
    },
    {
        path: "/profile/:userId",
        name: "profile",
        component: ProfilePage,
        beforeEnter: [authCheck]
    },
    {
        path: "/jobeditor",
        component: JobEditorComp
    }
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((guard)=>{
    token.value = window.sessionStorage.getItem("user_id");
})
export default router;
