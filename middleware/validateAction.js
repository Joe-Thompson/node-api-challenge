function validateAction() {
    return ( req, res, next ) => {
        if (!req.body) {
            return res.status(400).json({
                message: "missing action data"
            })
        } else if (!req.body.description) {
            return res.status(400).json({
                message: "missing required description field"
            })
        } else if (!req.body.notes) {
            return res.status(400).json({
                message: "missing required notes field"
            })
        } else {
            next()
        }
    }
}

module.exports = validateAction();
