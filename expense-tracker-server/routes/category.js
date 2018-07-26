var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const categories = await db.exec(`SELECT * from categories`)
        return res.send({resCode : 1, categories : categories})
    } catch (error) {
        return await res.send({resCode : 0, resMsg : `Error encountered`})
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (req.body.title == `` || req.body.title == undefined || req.body.description == `` || req.body.description == undefined) {
            return await res.send({resCode : 0, resMsg : `Title and description are required fields.`})
        }
        const category = await db.exec(`INSERT INTO categories SET ?`, { title : req.body.title, description : req.body.description})   
        if (category.affectedRows) {
            return await res.send({resCode : 1, resMsg : `Category successfully created.`})
        }
        return res.send({resCode : 0, resMsg : `Error encountered`})
    } catch (error) {
        return await res.send({resCode : 0, resMsg : `Error encountered`})
    }

});

router.put('/:id', async (req, res, next) => {
    console.log(req.body)
    try {
        if (req.params.id == `` || req.params.id == undefined || req.body.title == `` || req.body.title == undefined || req.body.description == `` || req.body.description == undefined) {
            return await res.send({resCode : 0, resMsg : `Id, title and description are required fields.`})
        }
        const category = await db.exec(`SELECT * FROM categories WHERE ?`, { id : req.params.id})   
        if (category) {
            const categoryUpdate = await db.exec(`UPDATE categories SET title = ?, description = ? WHERE id = ?`, [ req.body.title, req.body.description, req.params.id])
            if (categoryUpdate.affectedRows) {
                return res.send({resCode : 1, resMsg : `Category successfully updated`})
            }
            return res.send({resCode : 0, resMsg : `Error encountered`})
        }
        return res.send({resCode : 0, resMsg : `Error encountered`})
    } catch (error) {
        return await res.send({resCode : 0, resMsg : `Error encountered`})
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const categoryDelete = await db.exec(`DELETE from categories WHERE id = ?`, req.params.id)
        if (categoryDelete.affectedRows) {
            return res.send({resCode : 1, resMsg : `Category successfully deleted`})
        }
    } catch (error) {
        return await res.send({resCode : 0, resMsg : `Error encountered`})
    }
});



module.exports = router;
