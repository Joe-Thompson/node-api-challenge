const helpers = require("../data/helpers/projectModel");

function validateId() {
    return (req, res, next) => {
        helpers.get(req.params.id)
            .then((id) => {
                if (id) {
                    req.id = id;
                    next();
                } else {
                    res.status(404).json({
                        message: "Invalid project id"
                    })
                }
            })
            .catch((err) => {
                next(err);
            })
    }
}

module.exports = validateId();
