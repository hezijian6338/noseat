import qs from 'qs'
import {
    request
} from '@/api/request'

export const login = ({
    username,
    password
}) => {
    return new Promise((resolve, reject) => {
        let url = 'user/login'
        let data = qs.stringify({
            username,
            password,
        })
        request(url, {
            method: 'post',
            data,
        })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const getInfo = (token) => {
    return new Promise((resolve, reject) => {
        let url = 'user/info'
        let data = {
            token,
        }
        request(url, {
            headers: data,
            method: 'get',
        })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}