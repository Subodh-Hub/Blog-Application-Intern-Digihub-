import axios from 'axios'

export default axios.create({
    baseURL: 'http://172.17.17.133:8080',
})
