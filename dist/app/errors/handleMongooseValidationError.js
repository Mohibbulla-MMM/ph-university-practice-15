"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseValidationError = (err) => {
    const errorSource = Object.values(err.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    return {
        statusCode: 400,
        message: "Validation error",
        errorSource,
    };
};
exports.default = handleMongooseValidationError;
