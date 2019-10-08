import * as uuid from 'uuid';

export class Ingredient {
    uid: any;
    description: string;
    type: string;
    userId: any;
    date: number;
    constructor(userId) {
        this.uid = uuid.v4();
        this.userId = userId;
    }
}