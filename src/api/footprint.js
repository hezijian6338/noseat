import {
    request
} from '@/api/request'

export const history = () => {
    return new Promise((resolve, reject) => {
        let url = 'footprint/history'
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
