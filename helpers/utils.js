import {toJS} from "mobx";

export function dateFormat(date){
    return new Date(date).toLocaleDateString('ru-RU', {
        day: "numeric",
        year: "numeric",
        month: "long"
    })
}
export function fractional(num){
    if(Number.isInteger(num)){
        return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
}

export function getFilteredAsteroids(comets, set){
    let cont = []
    Object.keys(comets).forEach(e => {
        comets[e].forEach(j => {
            j.date = e;
            cont.push(j)
        })
    })

    return  cont.filter(e => set.has(e.id))
}
