import { extendObservable } from 'mobx';

class MyStore {
    constructor() {
        extendObservable(this, {
            myData: 'hi'
        });
    }
}

var Store = new MyStore();
export default Store;