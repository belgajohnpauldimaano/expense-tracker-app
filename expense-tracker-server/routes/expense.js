var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');
const Validator = require('validatorjs');

router.get('/:id', async (req, res, nextt) => {
    try {
        if (req.params.id == `` || req.params.id == undefined) {
            return await res.send({resCode : 0, resMsg : `Id is required`})
        }
        const expenses = await db.exec(`SELECT expenses.id, expenses.title AS expense_title, categories.title AS category_title, date, value from expenses INNER JOIN categories ON expenses.category_id = categories.id WHERE user_id = ?`, req.params.id)
        return res.send({resCode : 1, expenses : expenses})
    } catch (error) {
        return await res.send({resCode : 0, resMsg : `Error encountered`})
    }
})
router.post('/:id', async (req, res, nextt) => {
    try {
        if (
            req.params.id == `` || req.params.id == undefined ||
            req.body.title == `` || req.body.title == undefined ||
            req.body.category == `` || req.body.category == undefined ||
            req.body.date == `` || req.body.date == undefined ||
            req.body.value == `` || req.body.value == undefined
        ) {
            return await res.send({resCode : 0, resMsg : `Please fill all required fields.`})
        }
        const expenses = await db.exec(`INSERT INTO expenses SET ?`, { title: req.body.title, category_id: req.body.category, date	: req.body.date	, value: req.body.value, user_id: req.params.id, })
        return res.send({resCode : 1, expenses : expenses})
    } catch (error) {
        return await res.send({resCode : 0, resMsg : `Error encountered`})
    }
})
router.put('/:id', async (req, res, nextt) => {
    try {
        if (req.params.id == `` || req.params.id == undefined) {
            return await res.send({resCode : 0, resMsg : `Id is required`})
        }
        const expenses = await db.exec(`UPDATE expenses SET title=?, category_id=?, date=?, value=? WHERE id=? AND user_id=?`, [ req.body.title, req.body.category, req.body.date, req.body.value, req.body.id, req.params.id, ])
        return res.send({resCode : 1, expenses : expenses})
    } catch (error) {
        return await res.send({resCode : 0, resMsg : `Error encountered`})
    }
})
router.delete('/:id', async (req, res, nextt) => {
    try {
        if (req.params.id == `` || req.params.id == undefined) {
            return await res.send({resCode : 0, resMsg : `Id is required`})
        }
        const expenses = await db.exec(`DELETE from expenses WHERE id = ?`, req.body.id)
        return res.send({resCode : 1, expenses : expenses})
    } catch (error) {
        return await res.send({resCode : 0, resMsg : `Error encountered`})
    }
})

module.exports = router