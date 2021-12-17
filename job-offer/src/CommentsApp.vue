<template>
  <main class="p-4 bg-gray-50 min-h-screen">
    <div class="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
      <h2 class="text-3xl my-6">评论</h2>
      <CommentBox @submit="addNewComment"/>
      <DividerHorizontal />

      <div v-for="comment in comments" :key="comment.id">
        <CommentItem
          :user="comment.user"
          :avatar="comment.avatar"
          :time="comment.time"
          :content="comment.content"
        />
        <ReplyContainer v-if="comment.replies">
          <CommentItem
            v-for="reply in comment.replies"
            :key="reply.id"
            :user="reply.user"
            :avatar="reply.avatar"
            :time="reply.time"
            :content="reply.content"
          />
        </ReplyContainer>
        <ReplyBox @submit="addReply($event, comment.id)"/>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import CommentBox from "./components/CommentBox.vue";
import CommentItem from "./components/CommentItem.vue";
import ReplyBox from "./components/ReplyBox.vue";
import DividerHorizontal from "./components/DividerHorizontal.vue"
import ReplyContainer from "./components/ReplyContainer.vue"

import face from "./assets/avatar.jpg";

let comments = ref([
  {
    id: 1,
    user: "宜兴小火龙",
    avatar: face,
    time: "2小时前",
    content: "这个小方真的是太厉害了！！！！！！！！！！！！！！！！",
    replies: [
      {
        id: 2,
        user: "宜兴小火龙",
        avatar: face,
        time: "1小时前",
        content: "确实！"
      },
      {
        id: 3,
        user: "宜兴小火龙",
        avatar: face,
        time: "30分钟前",
        content: "啊对对对！！！！！！！"
      }
    ]
  }
]);

let rid = ref(4);

const constructNewComment = (content) => {
  return {
    id: rid.value++,
    user: "当前用户",
    avatar: face,
    content,
    time: "1秒前"
  };
};

const addNewComment = (content) => {
  const newComment = constructNewComment(content);
  comments.value.push(newComment);
}

const addReply = (content, id) => {
  const reply = constructNewComment(content);
  let comment = comments.value.find((comment) => comment.id === id);
  comment.replies ? comment.replies.push(reply): comment.replies = [reply];
}
</script>

<style scoped>

</style>
