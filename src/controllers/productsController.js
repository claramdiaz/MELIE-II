const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		let everyProduct =[];
		products.map(product =>{
			product.price = toThousand(product.price);
			everyProduct.push (product);
		})
		return res.render('products', { everyProduct });

		},
	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find (product => (product.id== req.params.id));
		product.finalPrice = product.discount >0 ? (product.price - (product.discount*product.price/100)) : product.price;
		product.price = toThousand(product.price);
		product.finalPrice = toThousand(product.finalPrice);
		return res.render('detail', {product});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render ("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit / aca devuelvo el que el usuario quiere editar
	edit: (req, res) => {
		let product = products.find (product => (product.id== req.params.id));
		res.render ("product-edit-form", {product});
	},
	// Update - Method to update
	update: (req, res) => {
		res.send("Lo actualizamos");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.send ("Lo borramos");
	}
};

module.exports = controller;