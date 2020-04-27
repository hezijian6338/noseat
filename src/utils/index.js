export function getUrlParams(result) {
    let a = result.split('?')[1].split('&')
    let a2 = []
    a.forEach(e => {
        let k = e.split('=')[0]
        let v = e.split('=')[1]
        a2.push({
            [k]: v
        })
    })
    return a2.reduce((acc, v) => {
        for (const key in v) {
            if (v.hasOwnProperty(key)) {
                acc[key] = v[key]
            }
        }
        return acc
    }, {})
}