import {
    request
} from '@/api/request'

export const seatCheck = ({
    room_num,
    row,
    col,
}) => {
    return new Promise((resolve, reject) => {
        let url = 'seat/check/room/' + room_num + '/row/' + row + '/col/' + col
        request(url, {
            method: 'post',
        })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const seatDown = ({
    montentTag,
    roomNumber,
    seatsNumber,
    wantedTime,
}) => {
    return new Promise((resolve, reject) => {
        let data = {
            montentTag,
            roomNumber,
            seatsNumber,
            wantedTime,
        }
        let url = 'seat/down'
        request(url, {
            method: 'post',
            data
        })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const seatLeave = () => {
    return new Promise((resolve, reject) => {
        let url = 'seat/leave'
        request(url, {
            method: 'post',
        })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export const seatTempLeave = () => {
    return new Promise((resolve, reject) => {
        let url = 'seat/temp/leave'
        request(url, {
            method: 'post',
        })
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
