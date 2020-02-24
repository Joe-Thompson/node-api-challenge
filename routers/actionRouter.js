const express = require("express");
const helpers = require("../data/helpers/actionModel");
const validateID = require("../middleware/validateID");
const validateAction = require("../middleware/validateAction");
const validateActionId = require("../middleware/validateActionID");

const router = express.Router();

router.get('/', (req, res, next) => {
    helpers.get()
        .then(actions => {
            return res.status(200).json(actions)
        })
        .catch(err => {
            next(err)
        })
});

router.get('/:id', validateActionId, (req, res, next) => {
    helpers.get(req.params.id)
        .then(actions => {
            return res.status(200).json(actions)
        })
        .catch(err => {
            next(err)
        })
});

router.post('/:id', validateID, validateAction, (req, res, next) => {
    const data = {
        ...req.body,
        project_id: Number(req.params.id)
    };
    helpers.insert(data)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            next(err)
        })
});

router.put('/:id',validateActionId, validateAction, (req, res, next) => {
    const data = {
        ...req.body,
        project_id: req.actionId,
    };
    helpers.update(req.params.id, req.body)
        .then(action => {
            res.status(202).json(action)
        })
        .catch(err => {
            console.log(data);
            next(err)
        })
});

router.delete('/:id', validateActionId, (req, res, next) => {
   helpers.remove(req.params.id)
       .then(action => {
           res.status(204).json(action)
       })
       .catch(err => {
           next(err)
       })
});



module.exports = router;
