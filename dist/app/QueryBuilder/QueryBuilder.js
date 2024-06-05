"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchebleFiel) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchebleFiel.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    filter() {
        const filterObj = Object.assign({}, this.query);
        const excludeQuery = [
            "searchTerm",
            "sort",
            "limit",
            "page",
            "skip",
            "fields",
        ];
        excludeQuery.forEach((field) => {
            delete filterObj[field];
        });
        this.modelQuery = this.modelQuery.find(filterObj);
        return this;
    }
    sort() {
        var _a, _b;
        const sort = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",").join(" ")) || "-createAt";
        console.log(sort);
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    patginate() {
        var _a, _b;
        const limit = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.limit) || 10;
        const page = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b;
        const fields = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(",").join(" ")) || "-__v";
        //   `${this?.query?.fields}`?.split(",").join(" ") || "-__v";
        //   `${this?.query?.fields}`?.replace(/,/g, " ") || "-__v";
        console.log(fields);
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
