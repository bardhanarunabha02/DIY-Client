<template>
  <div class="posts" id="maincontainer">
    <h1>Product Details</h1>
    
    <div v-for="post in posts" :key="post" style="text-align: left;">
      <p>
        <span><b>Product ID</b></span> : <span>{{ post.ProductID }}</span><br />
        <span><b>Product Name</b> </span> : <span>{{ post.ProductName }}</span><br/>
        <span><b> Product Description</b> </span> : <span>{{ post.ProductDescription }}</span>
      </p>
    </div>
    <!-- <button id="goFS" v-on:click="GoFullScreen()">Go fullscreen</button>
    <button id="exitFS" v-on:click="ExitFullScreen()">Exit fullscreen</button> -->
    <button id="toggleFS" v-on:click="ToggleFullScreen()">Toggle fullscreen</button>
  </div>
</template>

<script>
// import PostsService from 'services/PostsService'
import axios from 'axios'
import * as Three from 'three'
import * as screenfull from 'screenfull';
import * as Router from 'vue-router';
export default {
  name: 'posts',
  data () {
    return {
        posts: []
    }
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
      //document.body.webkitRequestFullscreen();     
      if (screenfull.enabled) {
        screenfull.request();
      } else {
        // Ignore or do something else
      }
    },
    ExitFullScreen (){
      screenfull.exit()
    },
    ToggleFullScreen (){
      if (screenfull.enabled) {
		  screenfull.toggle();
	    }
    },
    getPosts (){
      // debugger https://diy-server.herokuapp.com/posts https://diy-server.herokuapp.com/
      debugger;
      let productID = this.$route.params.prodid;
      let postBody = {};
      postBody.prodcode = productID; //EN58745896332, EN58745896321
      
      axios.post('http://localhost:3000/', 
        JSON.parse(JSON.stringify(postBody))).then(response=> {
        debugger
        this.posts = response.data
      })
    },
    /*
    axios.get('http://localhost:3000/').then(response=> {
        debugger
        this.posts = response.data
      })
    */
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
