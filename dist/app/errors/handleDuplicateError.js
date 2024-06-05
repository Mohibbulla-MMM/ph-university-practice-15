"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    var _a, _b;
    const regex = /"([^"]*)"/;
    const match = (_b = (_a = err === null || err === void 0 ? void 0 : err.errorResponse) === null || _a === void 0 ? void 0 : _a.errmsg) === null || _b === void 0 ? void 0 : _b.match(regex);
    const extractMessage = match && match[1];
    const path = Object.keys(err === null || err === void 0 ? void 0 : err.keyPattern)[0];
    const message = Object.values(err === null || err === void 0 ? void 0 : err.keyValue)[0];
    return {
        statusCode: 400,
        message: `<<<${extractMessage}>>> is already exist `,
        errorSource: [
            {
                path: path,
                message: message,
            },
        ],
    };
};
exports.default = handleDuplicateError;
// statusCode: number;
// message: string;
// errorSource: TErrorSources;
