const express = require('express');
const { isLoggedIn } = require('../auth/authMiddleware');
const router = express.Router();
router.use(isLoggedIn);
const manufacturerService = require('../service/manufacturerService');

/* GET cities */
router.get('/', async function (req, res, next) {
    try {
        res.json(await manufacturerService.getAll());
    } catch (err) {
        console.log('Error while getting manufacturer', err.message);
        next(err);
    }
});
/* GET cities by page */
router.get('/page', async function (req, res, next) {
    try {
		const page = req.query.page ? parseInt(req.query.page) : 1;
		const size = req.query.size ? parseInt(req.query.size) : 5;
		const orderBy = req.query.orderBy ? req.query.orderBy : 'name';
		const order = req.query.order ? req.query.order : 'ASC';
		
		console.log('page', req.query, page, size, orderBy, order);
        res.json(await manufacturerService.getByPage(page, size, orderBy, order));
    } catch (err) {
        console.log('Error while getting manufacturer', err.message);
        next(err);
    }
});

/* GET manufacturer by id */
router.get('/:id', async function (req, res, next) {
    try {
        res.json(await manufacturerService.get(req.params.id));
    } catch (err) {
        console.log(`Error while getting manufacturer with id = ${id}`, err.message);
        next(err);
    }
});

/* POST manufacturer */
router.post('/', async function (req, res, next) {
    try {
        res.json(await manufacturerService.create(req.body));
    } catch (err) {
        console.log('Error while creating new manufacturer', err.message);
        next(err);
    }
});

/* PUT manufacturer */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await manufacturerService.update(req.params.id, req.body));
    } catch (err) {
        console.log('Error while updating existing manufacturer', err.message);
        next(err);
    }
});

/* DELETE manufacturer */
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await manufacturerService.remove(req.params.id));
    } catch (err) {
        console.log('Error while deleting manufacturer', err.message);
        next(err);
    }
});



module.exports = router;