import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchPosts () {
    debugger;
    return axios
      .get('http://localhost:8081/posts')
  }
}