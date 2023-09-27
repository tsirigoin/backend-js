import fs from 'fs';

export class ProductManager {
	productId = 1

	constructor(path) {
		this.path = path;
		this.products = [];
	}

	addProduct(product) {
		this.products = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,'utf-8')) : [];

		const {title, description, price, thumbnail, code, stock} = product;

		if (!title || !description || !price || !thumbnail || !code || !stock) {
			return console.log(`Faltan argumentos`);
		}

		if (this.products.length > 0) {
			const existElem = this.products.some(elem => elem.code === code);
			
			if (existElem) {
				return console.log(`Existe un producto con el código ya ingresado.`)
			}
		}
		
		this.products.push({
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
			id: this.productId
		});

		this.productId++;

		fs.writeFileSync(this.path,JSON.stringify(this.products,null,'\t'));
	}

	getProducts() {
		if (fs.existsSync(this.path)) {
			this.products = JSON.parse(fs.readFileSync(this.path,'utf-8'));

			return this.products;
		} else {
			return [];
		}
	}

	getProductsById(id) {
		if (fs.existsSync(this.path)) {
			this.products = JSON.parse(fs.readFileSync(this.path,'utf-8'))

			const product = this.products.find((elem) => elem.id === id)

			if (!product) {
				return null;

			} else {
				return product;

			}
		} else {
			return `Path not found.`

		}
	}

	updateProduct(id,product) {
		if (fs.existsSync(this.path)) {
			this.products = JSON.parse(fs.readFileSync(this.path,'utf-8'));

			const prod = this.products.find((elem) => elem.id === id);

			if (prod) {
				const i = this.products.indexOf(prod);

				if (product.title && product.title !== prod.title) {
					prod.title = product.title;
				}
				if (product.description && product.description !== prod.description) {
					prod.description = product.description;
				}
				if (product.price && product.price !== prod.price) {
					prod.price = product.price;
				}
				if (product.thumbnail && product.thumbnail !== prod.thumbnail) {
					prod.thumbnail = product.thumbnail;
				}
				if (product.code && product.code !== prod.code) {
					elem.code = product.code;
				}
				if (product.stock && product.stock !== prod.stock) {
					prod.stock = product.stock;
				}

				this.products[i] = prod;

				fs.writeFileSync(this.path,JSON.stringify(this.products,null,'\t'));
			} else {
				return `Item not found`;
			}
		} else {
			return `Path not found`;
		}
	}

	deleteProduct(id) {
		if (fs.existsSync(this.path)) {
			this.products = JSON.parse(fs.readFileSync(this.path,'utf-8'));

			this.products = this.products.filter(elem => elem.id !== id);
		} else {
			return `Path not found`;
		}
	}
}