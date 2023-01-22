
const { validationResult } = require('express-validator');

module.exports = (req, res) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) {
        return false;
    }

    return res.status(422).json({
        errors: errors.array()
            .reduce((carry, { param, msg }) => Object.assign(carry, {
                [param]: (carry[param] || []).concat(msg)
            }), {})
    });
};