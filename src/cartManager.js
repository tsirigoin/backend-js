import fs from 'fs';
import path from 'path';

const patho = path;

export class CartManager {
	cartId = 1;

	constructor(path) {
		this.path = patho.join('data',path);
		this.carts = [];
	}

	addNewCart() {
		this.carts = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,'utf-8')) : [];

		this.carts.push({
			products: [],
			id: this.cartId
		});
		
		this.cartId++;

		fs.writeFileSync(this.path,JSON.stringify(this.carts,null,'\t'));
	}

	getById(id) {
		if (fs.existsSync(this.path)) {
			this.carts = JSON.parse(fs.readFileSync(this.path,'utf-8'));

			const cart = this.carts.find((elem) => elem.id === id);

			if (!cart) {
				return null;
			} else {
				return cart.products;
			}
		} else {
			return null;
		}
	}

	addProductToCart(pid,cid,quantity) {
		if (fs.existsSync(this.path)) {
			this.carts = JSON.parse(fs.readFileSync(this.path,'utf-8'));

			const cart = this.carts.find((elem) => elem.id === cid);

			console.log('estoy acá');

			if (!cart) {

				console.log('no hay cart');
				return null;
			} else {
				let product = cart.products.find((elem) => elem.id === pid);
				if (product) {
					console.log('ya existe el producto en cart');
					product.quantity += quantity;
				} else {
					console.log('no existe el producto en cart');
					cart.products.push({
						id: pid,
						quantity: quantity
					})
				}
				fs.writeFileSync(this.path,JSON.stringify(this.carts,null,'\t'));
			}
		} else {
			return null;
		}
	}
}