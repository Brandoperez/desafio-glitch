import {promises as fs} from 'fs';

export class ProductManager{
    constructor(path){
        this.products = [];
        this.path = path;
    }
        static incrementarID(){
            if(idIncrement){
                this.idIncrement++
            }else{
                this.idIncrement = 1;
            }
            return this.idIncrement
        }
    
    async getProducts(){
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        return prods;
    }

    async addProducts(prod){
        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'));
        const existProds = prods.find(producto => producto.code = prod.code)
            if(existProds){
                return false;
            }else{
                prod.id = ProductManager.incrementarID();
                prods.push(producto);
                await fs.writeFile(this.path, JSON.stringify(prods));
                return true;
            }
    }
}