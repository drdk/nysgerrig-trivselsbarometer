import { extendObservable } from 'mobx';

class MyStore {
    constructor() {
        extendObservable(this, {
            screen: 'create',
            myData: 'hi'
        });
    }
}

var Store = new MyStore();
export default Store;