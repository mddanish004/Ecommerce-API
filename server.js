import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js'
import Product from './models/Product.js'
import Category from './models/Category.js'
import Cart from './models/Cart.js'
import Order from './models/Order.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

connectDB()


app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
