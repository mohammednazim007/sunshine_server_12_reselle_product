require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require("express")
const app = express()
const cors = require('cors')

const { getAllcategories, filter_productByName, getSingleProductByid, storePurchesProduct, getWholeProducts, store_register_user, getAllUsers, add_product, findUserRole, filterUserWithEmail, deleteStoreRegisterUser, getAddedProductByEmail } = require('./controlar_fn')

const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))


const run = async () => {

    // get all categories product
    app.get('/getAllCategories', getAllcategories)

    // get all filter product by name
    app.get("/filterByName/:name", filter_productByName)

    // get all products
    app.get('/products', getWholeProducts)

    //get single product filter by id
    app.get("/single_product/:id", getSingleProductByid)

    // store purches product
    app.post('/store_purches_product', storePurchesProduct)

    //Store register user
    app.post("/register_user", store_register_user)

    //get all register users
    app.get("/all_register_user", getAllUsers)

    //add product by selar
    //
    app.post("/add_product", add_product)

    //find user info admin, selar or user
    app.get("/find_user_role/:role", findUserRole)

    // filter user by email
    //
    app.get('/filter/:email', filterUserWithEmail)

    //delete user by admim
    // the user will define with user id
    app.delete("/user_delete_one/:id", deleteStoreRegisterUser)

    //get all added product depend on user email
    // filter product by email
    app.get("/filter_added_product/:email", getAddedProductByEmail)

}
run().catch(e => console.log(e.message))


app.get('/', function (req, res) {
    return res.json({ msg: 'furniture server is running' })
})

app.listen(port, function () {
    console.log('web server is listening on port', port)
})