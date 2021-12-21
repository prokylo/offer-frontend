<template>
  <main class="scroll-container">
    <header class="h-24 min-w-full p-4 flex bg-white flex-wrap sticky top-0 z-10">
      <div class="self-center">
        <span class="text-3xl text-green-600 mx-8">XX招聘</span>
      </div>
      <nav class="flex items-center ml-auto mr-4">
        <div class="border-b-4 border-transparent hover:border-green-600 p-2">
          <a class="list-none mx-4 text-xl " href=""><router-link to="/offers">HOME</router-link></a>
        </div>
        <div class="border-b-4 border-transparent hover:border-green-600 p-2">
          <a class="list-none mx-4 text-xl " href=""><router-link to="/community">COMMUNITY</router-link></a>
        </div>
        <div class="border-b-4 border-transparent hover:border-green-600 p-2">
          <a class="list-none mx-4 text-xl" href="">FEATURES</a>
        </div>
        <div class="border-b-4 border-transparent hover:border-green-600 p-2">
          <a class="list-none mx-4 text-xl" href="">CONTACT</a>
        </div>
      </nav>
      <button
          class="bg-green-600 border-2 rounded-lg place-self-center mr-1
          text-white py-3 px-6 justify-self-center shadow hover:bg-green-700 text-xl"
          :class="[ isLogin === null ? 'visible' : 'hidden']" @click="handleOpenLoginBox"
      >Sign In
      </button>
      <button :class="[ isLogin === null ? 'hidden' :'visible']" @click="handleOpenLoginBox">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
    </header>
    <section class="min-w-full bg-yellow-50 flex justify-evenly flex-wrap scroll-items">
      <div class="self-center">
        <p class="text-4xl" ref="title">从这里，开启你的招聘之旅！</p>
        <p class="subtitle text-gray-500 text-xl mt-4" ref="subtitle">这是一个集招聘信息、分享、吐槽于一体的平台</p>
        <button class="bg-yellow-500 rounded-md text-3xl text-white py-6 px-10 shadow-xl mt-8">Get Started</button>
      </div>
      <div class="self-center">
        <img :src="myimg" class="w-160 h-96 ml-auto rounded-lg border-8 border-white shadow-lg"/>
      </div>
    </section>
    <section class="min-w-full scroll-items flex justify-around items-center">
      <h2 class="text-4xl">畅所欲言！</h2>
      <figure>
        <img src="./assets/logo.png" class=""/>
      </figure>
      <h3 class="text-3xl text-gray-400 max-w-md">分享你有意思的职场故事，传授你独特的面试技巧，交流你学到的学术知识</h3>
    </section>
  </main>
  <transition name="loginbox">
    <LoginBox
        v-if="showLoginBox"
        @click="showLoginBox = !showLoginBox"
        @submit="appHandleLogin"
    />
  </transition>
  <footer class="bg-gray-50 min-w-full px-36 py-20 hidden">
    <figure>
      <img src="./assets/logo.png" class="w-12 h-12"/>
      <p class="text-md mt-2">@小方科技版权所有</p>
    </figure>
    <div class="mt-4">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </span>
      <span class="">技术交流</span>
    </div>
  </footer>
  <button
      @click="backToTop"
      class="fixed bg-gray-100 p-8 text-2xl right-8 bottom-8 rounded-full text-gray-500 hidden">UP</button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import introbg from './assets/intro-bg-wrapper.jpg'
import LoginBox from './components/LoginBox.vue'
const myimg = introbg;

//back to top button event function
const backToTop = () => {
  // window.scrollTo({
  //   top: 100,
  //   left: 100,
  //   behavior: 'smooth'
  // });
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  // console.log(haha)
  // const that = this;
  // let timer = setInterval(()=>{
  //   let ispeed = Math.floor(-that.scrollTop / 5);
  //   document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
  //   if (that.scrollTop === 0){
  //     clearInterval(timer);
  //   }
  // }, 16)
};

//params and callbacks of login module
const showLoginBox = ref(false);

const emit = defineEmits(["click"]);
const handleOpenLoginBox = () => {
  showLoginBox.value = !showLoginBox.value
};

const appHandleLogin = (userObj) => {
  /*regular expression to varify user and password*/
  console.log(userObj.username)
  console.log(userObj.password)
  //request .....
  sessionStorage.setItem('isLogin', 'true');
  isLogin.value = sessionStorage.getItem('isLogin');
  handleOpenLoginBox()
  alert('登陆成功！')
};

let isLogin = ref(sessionStorage.getItem('isLogin'));

//animation of titles

let fadeAndMove = [
  {
    opacity: 0,
    transform: `translateY(-20px)`
  },
  {
    opacity: 1,
    transform: `translateY(0px)`
  }
];

let expand = [
  {
    letterSpacing: "-0.5rem",
    opacity: 0
  },
  {
    letterSpacing: "initial",
    opacity: 1
  }
];

let titleTiming = {
  duration: 2000,
  easing: "ease-in-out"
};

const title = ref(null)
const subtitle = ref(null)
onMounted(()=>{
  const titleChange = title.value.animate(fadeAndMove, titleTiming);

  let subtitleTiming = {
    duration: titleChange.effect.getComputedTiming().duration / 2,
    easing: "ease-in-out"
  };

  const subTitleChange = subtitle.value.animate(expand, subtitleTiming);
  subTitleChange.pause();
  titleChange.pause();

  // stop animation and play when clicking the session

  // subTitleChange.pause();
  //
  // document.addEventListener("click", ()=>{
  //   if(subTitleChange.playState !== "finished") {
  //     subTitleChange.play();
  //   }
  // })

  const sections = document.querySelectorAll('section');
  const callback = (e) => {
    titleChange.play();
    subTitleChange.play();
  };

  const observer = new IntersectionObserver(callback);

  sections.forEach( section => {
    observer.observe( section );
  });
})

</script>

<style scoped lang="less">
  .scroll-container{
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100vh;
    scroll-behavior: smooth;
    scroll-padding: 6rem;
  }
  .scroll-items{
    scroll-snap-align: start;
    scroll-behavior: smooth;
    width: 100vw;
    height: 100vh;
  }
  .scroll-container::-webkit-scrollbar{
    //display: none;
  }
  .loginbox-enter-from, .loginbox-leave-to{
    opacity: 0;
    transform: scale(0.1);
  }
  .loginbox-enter-active, .loginbox-leave-active{
    transition: all 1s ease;
  }
</style>
