import axios from 'axios'
export function request(config){
    //1.创建instance实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })

    //2.axios的拦截器
    //2.1请求拦截的作用
    instance.interceptors.request.use(config=>{
        return config
    },err=>{
        
    })

    instance.interceptors.response.use(res=>{
        return res.data
    },error=>{
        return error
    })

    //3.发送请求
    return instance(config)
}