import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchebleFiel: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchebleFiel.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    const filterObj = { ...this.query };
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
    this.modelQuery = this.modelQuery.find(filterObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",").join(" ") || "-createAt";
    // console.log(sort);
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  patginate() {
    const limit = Number(this.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * (limit as number);

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields: string =
      (this?.query?.fields as string)?.split(",").join(" ") || "-__v";
    //   `${this?.query?.fields}`?.split(",").join(" ") || "-__v";
    //   `${this?.query?.fields}`?.replace(/,/g, " ") || "-__v";
    // console.log(fields);
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
