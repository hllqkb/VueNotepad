// 引入axios
import axios from 'axios'
const instance = axios.create({
    timeout:1000*12
})
// 向服务器请求数据
export default{
    getUserinfo(){
        return instance({
            method:'get',
            url:'http://127.0.0.1:3000/getuserinfo',
        })
    },
    getTableData(){
        return instance({
            method:'get',
            url:'http://127.0.0.1:3000/gettableData',
        })
    },
    getApplyInfo(){
        return instance({
            method:'get',
            url:'http://127.0.0.1:3000/getapplyInfo',
        })
    },
}