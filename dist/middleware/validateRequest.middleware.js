"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(request) {
    return (req, res, next) => {
        const validate = request(req);
        if (!validate.success) {
            const errors = validate.error.flatten().fieldErrors;
            return res.status(400).json({ errors });
        }
        next();
    };
}
