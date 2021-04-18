import {makeAutoObservable, toJS} from "mobx";
import {createContext, useState} from "react";
import Cookie from 'mobx-cookie'

class CometStore {
    constructor() {
        makeAutoObservable(this);
    }

    cookie = new Cookie('destroys');
    filteredAsteroids = [];
    distance = true;
    onlyDangers = false;
    forDestroy = new Set(this.cookie.value ? [...JSON.parse(this.cookie.value)] : []);
    cometNum =  10;

    changeDistance = () => {
        this.distance = !this.distance
    }

    changeDangerFilter = () => {
        this.onlyDangers = !this.onlyDangers
    }

    addToDestroy = (id) => {
        this.forDestroy.has(id) ? this.forDestroy.delete(id) : this.forDestroy.add(id);
        this.cookie.set(JSON.stringify([...this.forDestroy]))
        this.filteredAsteroids = this.filteredAsteroids.filter(e => this.forDestroy.has(e.id))
    }

    filterAsteroids = (comets) => {
        if (!comets) {
            this.filteredAsteroids = [];
            return
        }
        let cont = []
        Object.keys(comets).forEach(e => {
            comets[e].forEach(j => {
                j.date = e;
                cont.push(j);
            })
        })
        this.filteredAsteroids = cont.filter(e => this.forDestroy.has(e.id));
    }

    destroyAll = () => {
        this.forDestroy.clear();
        this.cookie.remove();
        this.filteredAsteroids = [];
    }

    setCometNum = (num) => {
        this.cometNum = num;
    }

}

export const distanceContext = createContext(new CometStore())
export const cometParams = new CometStore()



