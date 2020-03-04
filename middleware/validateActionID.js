const helpers = require("../data/helpers/actionModel");

function validateActionId() {
    return (req, res, next) => {
        helpers.get(req.params.id)
            .then((id) => {
                if (id) {
                    req.actionId = id;
                    next();
                } else {
                    res.status(404).json({
                        message: "Invalid action id"
                    })
                }
            })
            .catch((err) => {
                next(err);
            })
    }
}

module.exports = validateActionId();
