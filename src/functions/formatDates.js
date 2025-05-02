export function getDate(fulldate){
    let date = new Date(fulldate)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export function getTime(fulldate){
    let date = new Date(fulldate)
    return `${date.getHours}/${date.getFullYear()}`
}