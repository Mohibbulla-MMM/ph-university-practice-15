"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseCastError = (err) => {
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        errorSource: errorSource,
        message: "Invalid ID",
        statusCode: 400,
    };
};
exports.default = handleMongooseCastError;
// {
//     path: err?.path as string,
//     message: err?.message,
//   };
