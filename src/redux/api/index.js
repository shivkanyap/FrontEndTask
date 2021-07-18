import axios from 'axios'

 let obj={
    title:data
}
export const fetchPosts=()=> axios.post('http://localhost:3005/word/add',obj,config)