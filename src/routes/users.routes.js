const router = require('express').Router();
const UID = require('../models/UID');
const pool = require('../database');

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM entrances JOIN users WHERE entrance_id=(SELECT MAX(entrance_id) FROM entrances)`, (err, entranceStored) => {
        if (err) {
            res.send(`Error Interno DB`);
        } else {
            res.render('pages/index', {entranceStored: entranceStored[0]});
        }
    })

});
router.get('/new/uid', (req, res) => {
    res.render('pages/newUID');
});
router.post('/new/uid', (req, res) => {
    pool.query(`INSERT INTO users SET ?`, [req.body], (err) => {
        if (err) {
            res.send('Error interno DB. Consulta la consola.');
            console.log(err);
        } else {
            res.redirect('/see/uid');
        }
    })
});
router.get('/get/uid/:uid', (req, res) => {
    pool.query(`SELECT * FROM users WHERE uid = ?`, [req.params.uid], (err, uidStored) => {
        if (err) {
            res.send('Error:' + err);
        } else {
            if (!uidStored) {
                res.send("Este ID no existe");
            } else {
                res.send(uidStored);
            }
        }
    })
});

router.get('/see/uid', (req, res) => {
    pool.query(`SELECT * FROM users`, (err, uidStored) => {
        if (err) {
            res.send('Error interno DB');
        } else {
            console.log(uidStored);
            let finalUIDs = [];
            uidStored.forEach((uidElement) => {
                finalUIDs.push(JSON.parse(JSON.stringify(uidElement)));
            });
            console.log(finalUIDs);
            res.render('pages/seeUID', {
                uids: uidStored
            });

        }
    });
});

router.get('/delete/:uid', (req, res) => {
    pool.query(`DELETE FROM users WHERE uid = ?`, [req.params.uid], (err) => {
        if (err) {
            res.send('Error interno DB');
        } else {
            res.redirect('/see/uid');
        }
    })
})

module.exports = router;