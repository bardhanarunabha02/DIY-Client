<template>
  <div class="posts" id="maincontainer" style="background-color:blue">
    <h1>Posts</h1>
    This file will list all the posts.

    <div v-for="post in posts" :key="post">
      <p>
        <span><b>{{ post.color }}</b></span><br />
        <span>{{ post.value }}</span>
      </p>
    </div>
    <button id="goFS" v-on:click="GoFullScreen()">Go fullscreen</button>
  </div>
</template>

<script>
// import PostsService from 'services/PostsService'
import axios from 'axios'
import * as Three from 'three'
export default {
  name: 'posts',
  data () {
    return {
        posts: []
    }
  },
  beforeCreate(){
    debugger;
    
  },
  mounted () {
    // debugger
    //this.init()
    //this.animate()
    
     this.getPosts()
  },
  methods: {
    GoFullScreen (){
      debugger;
      //document.body.requestFullscreen();
      document.body.webkitRequestFullscreen();          
    },
    getPosts (){
      // debugger
      axios.get('http://localhost:8081/posts').then(response=> {
        debugger
        this.posts = response.data
      })
    },
    init (){
      // debugger
      let container = document.getElementById('app')

      this.camera = new Three.PerspectiveCamera(70, container.clientWidth/ container.clientHeight, 0.01, 10)
      this.camera.position.z = 1

      this.scene = new Three.Scene()

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      let material = new Three.MeshNormalMaterial()

      this.mesh = new Three.Mesh(geometry, material)
      this.scene.add(this.mesh)

      this.renderer = new Three.WebGLRenderer({antialias: true})
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate (){
      // debugger
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
