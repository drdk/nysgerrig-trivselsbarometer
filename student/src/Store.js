import { extendObservable } from 'mobx';

class MyStore {
    constructor() {
        extendObservable(this, {
            screen: 'login',
            myDate: 'defaultData'
        }); 
    }
}

var Store = new MyStore();
export default Store;