import qs from 'qs'
import {
    request
} from '@/api/request'

export const getBoard = ({ year, month, day }) => {
    return new Promise((resolve, reject) => {
        let url = 'footprint/leader/board/' + year + '/' + month + '/' + day
        request(url, {
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

export const checkTime = (token) => {
    return new Promise((resolve, reject) => {
        let url = 'footprint/check/time'
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