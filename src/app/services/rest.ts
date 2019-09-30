import { AngularFireDatabase } from '@angular/fire/database';
export abstract class Rest {
    modelName: string;
    protected db: AngularFireDatabase;
    constructor(modelName: string, angularFireDataBase) { 
        this.modelName = modelName;
        this.db = angularFireDataBase;
    }
    get() {
        return this.db.list('/' + this.modelName);
    }
    getById(uid: number) {
        return this.db.object('/' + this.modelName + '/' + uid);
    }
    create(object: any) {
        return this.db.object('/' + this.modelName).set(object);

    }
    update(object: any) {
        return this.db.object('/' + this.modelName + '/' + object.uid).set(object);
    }
    abstract delete(id: number): any;
}
