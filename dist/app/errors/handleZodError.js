"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
// handle zod error
const handleZodError = (err) => {
    var _a;
    const errorSource = (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path.pop(),
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    return {
        statusCode: 400,
        message: "Validation error",
        errorSource,
    };
};
exports.handleZodError = handleZodError;
