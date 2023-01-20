import express from 'express'
import { faker } from '@faker-js/faker'
const { datatype, commerce, image } = faker;
faker.locate = "es";

const router = express.Router()

router.get('/', async (req, res) => {
    let arrayProductos = [];
    for (let index = 0; index < 5; index++) {
        arrayProductos.push({ nombre: commerce.productName(), precio: commerce.price(), foto: image.imageUrl(), id: datatype.number() })
    }
    res.status(200).json(arrayProductos)
})

export default { router };