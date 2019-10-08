import * as uuid from 'uuid';

export class Recipe {
    uid: any;
    title: string;
    picture?: any;
    procedure?: string;
    time: string;
    userId: any;
    constructor(userId, data: any= null) {
        if (data)  {
            this.uid = data.uid;
            this.title = data.title;
            this.picture = data.picture;
            this.procedure = data.procedure;
            this.time = data.time;
        } else {
            this.uid = uuid.v4();
        }
        this.userId = userId;
    }
}



export class RecipeIngredients {
    uid: any;
    unit: string;
    quantity: number;
    ingredient: string;
    recipeId: any;
    constructor(recipeId, data: any = []) {
        if (data)  {
            this.uid = data.uid;
            this.unit = data.unit;
            this.quantity = data.quantity;
            this.ingredient = data.ingredient;
            this.recipeId = data.recipeId;
        } else {
            this.uid = uuid.v4();
            this.recipeId = recipeId;
            this.unit = ' ';
        }
        
    }
}

export interface RecipeInterface {
    uid?: any;
    title?: string;
    picture?: any;
    procedure?: string;
    time?: string;
    userId?: any;
}

export interface RecipeIngredientsInterface {
    uid: any;
    unit: string;
    quantity: number;
    ingredient: string;
    recipeId: any;
}