const express = require("express");
const helpers = require("../data/helpers/projectModel");
const validateId = require('../middleware/validateID');

const router = express.Router();

router.get('/', (req, res, next) => {
    helpers.get()
        .then(projects => {
            return res.status(200).json(projects)
        })
        .catch(err => {
            next(err)
        })
});

router.get('/:id', validateId, (req, res, next) => {
    helpers.getProjectActions(req.params.id)
        .then(projects => {
            return res.status(200).json(projects)
        })
        .catch(err => {
            next(err)
        })
});

router.post('/', (req, res, next) => {
    helpers.insert(req.body)
        .then(project => {
            if (!req.body) {
                res.status(400).json({
                    errorMessage: "Please check your data structure and try again"
                })
            } else {
                res.status(201).json(project)
            }
        })
        .catch(err => {
            next(err)
        })
});

router.put('/:id', (req, res, next) => {
   helpers.update(req.params.id, req.body)
       .then(project => {
           if (!req.body) {
               res.status(400).json({
                   errorMessage: "Please check your data structure and try again"
               })
           } else {
               res.status(202).json(project)
           }
       })
       .catch(err => {
           next(err)
       })
});

router.delete('/:id', (req, res, next) => {
   helpers.remove(req.params.id)
       .then(project => {
           res.status(202).json(project)
       })
       .catch(err => {
           next(err)
       })
});



module.exports = router;
