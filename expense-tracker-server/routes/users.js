var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', async (req, res, next) => {
  try {
    const users = await db.exec(`SELECT * FROM users WHERE id = ?`, req.body.id)

    if (users.length > 0) {
      return await res.send({
        resCode: 1,
        data: {
          id: req.body.id,
          username: req.body.username
        }
      })
    } else {
      return await res.send({
        resCode: 1,
        data: {
          id: ``,
          username: ``
        }
      })
    }
  } catch (error) {
    return await res.send({ resCode: 0, resMsg: `Error encountered` })
  }
});

router.post('/register', async (req, res, next) => {

  try {
    const users = await db.exec(`SELECT * FROM users WHERE username = ?`, req.body.un)
    if (users.length > 0) {
      return await res.send({
        resCode: 1,
        data: {
          id: users[0].id,
          username: users[0].username
        }
      })
    } else {
      return await res.send({
        resCode: 1,
        data: {
          id: ``,
          username: ``
        }
      })
    }
  } catch (error) {
    return await res.send({ resCode: 0, resMsg: `Error encountered` })
  }

  try {
    const users = await db.exec(`INSERT INTO users SET ?`, { username: req.body.un })

    if (users) {
      const user = await db.exec(`SELECT * FROM users WHERE id = ?`, users.insertId)
      if (users) {
        return await res.send({
          resCode: 1,
          data: {
            id: user[0].id,
            username: user[0].username
          }
        })
      } else {
        return await res.send({
          resCode: 1,
          data: {
            id: ``,
            username: ``
          }
        })
      }
    } else {
      return await res.send({
        resCode: 1,
        data: {
          id: ``,
          username: ``
        }
      })
    }
  } catch (error) {
    return await res.send({ resCode: 0, resMsg: `Error encountered` })
  }
});


module.exports = router;
