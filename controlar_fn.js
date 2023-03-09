
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.DATABASE_URL
var jwt = require('jsonwebtoken');


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const db = client.db("woot-server-suhshine")
const productCategories = db.collection("product_category");
const all_products = db.collection('products')
const store_product = db.collection("purches_products")
const user_collection = db.collection("users")


// console.log(process.env.URL);
// console.log(process.env.PORT);

//get all categories
const getAllcategories = async (req, res) => {
    try {
        const query = {}
        const result = await productCategories.find(query).toArray()

        return res.send({
            status: 200,
            data: result
        })
    } catch (error) {
        return res.status(404).send({
            message: error.message
        })
    }
}


// get filter product by product name
const filter_productByName = async (req, res) => {
    try {

        const productName = req.params.name
        const filter = { category: productName }

        const result = await all_products.find(filter).toArray()

        console.log(result);
        return res.send({
            message: "Data fetching successfull",
            data: result
        })

    } catch (error) {
        return res.status(401).send({
            message: error.message
        })
    }
}

// get single product filter by id
const getSingleProductByid = async (req, res) => {
    try {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }

        const result = await all_products.find(filter).toArray()

        return res.send({
            message: "Data filter by id successfull",
            data: result
        })

    } catch (error) {
        return res.send({
            status: 401,
            message: error.message
        })
    }
}

// store purches product 
//
const storePurchesProduct = async (req, res) => {
    try {
        const body = req.body

        const result = await store_product.insertOne(body)


        return res.send({
            message: "Data store successfull",
            data: result
        })

    } catch (error) {
        return res.status(401).send({
            message: error.message
        })
    }
}

// get whole products for service
//
const getWholeProducts = async (req, res) => {
    try {
        const query = {}
        const result = await all_products.find(query).toArray()



        return res.send({
            message: "Data store successfull",
            data: result
        })

    } catch (error) {
        return res.status(404).send({ message: error.message })
    }
}


//store all register user
//
const store_register_user = async (req, res) => {
    try {
        const user = {
            ...req.body,
            isVerify: false
        }


        const result = await user_collection.insertOne(user)



        return res.send({
            status: 200,
            data: result,
        })

    } catch (error) {
        return res.send({
            message: error.message
        })
    }
}

// get all store user
//
const getAllUsers = async (req, res) => {
    try {
        const query = {}
        const result = await user_collection.find(query).toArray()


        return res.send({
            status: 200,
            data: result
        })
    } catch (error) {
        return res.status(404).send({
            message: error.message
        })
    }
}



// get all store user
//
const add_product = async (req, res) => {
    try {
        const body = req.body
        const result = await all_products.insertOne(body)



        return res.send({
            status: 200,
            data: result
        })
    } catch (error) {
        return res.status(404).send({
            message: error.message
        })
    }
}

//find user info admin, selar or user
const findUserRole = async (req, res) => {
    try {
        let query = {}

        if (req.params.role) {
            query = { role: req.params.role }
        }
        const result = await user_collection.find(query).toArray()



        return res.send({
            status: 200,
            data: result
        })
    } catch (error) {
        return res.status(404).send({
            message: error.message
        })
    }
}


//find user info admin, selar or user
//
const filterUserWithEmail = async (req, res) => {
    try {

        const email = req.params.email
        let query = { email: email }

        const result = await user_collection.findOne(query)

        console.log(result);
        console.log(email);

        return res.send({
            status: 200,
            data: result
        })
    } catch (error) {
        return res.status(404).send({
            message: error.message
        })
    }
}

//delete store user by admi
//
const deleteStoreRegisterUser = async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }

        const result = await user_collection.deleteOne(query)



        return res.send({
            status: 200,
            data: result
        })

    } catch (error) {
        return res.send({
            message: error.message
        })
    }
}

//get added product filter by email
//
const getAddedProductByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const query = { email: email }

        const find_product = await all_products.find(query).toArray()

        return res.send({
            status: 200,
            data: find_product
        })

    } catch (error) {
        return res.send({
            message: error.message
        })
    }
}


module.exports = { getAllcategories, filter_productByName, getSingleProductByid, storePurchesProduct, getWholeProducts, store_register_user, getAllUsers, add_product, findUserRole, filterUserWithEmail, deleteStoreRegisterUser, getAddedProductByEmail }