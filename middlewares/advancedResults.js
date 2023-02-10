const advancedResults = (model, populate) => async (req, res, next) => {
    let query;
    let reqQuery = { ...req.query };
  
    const removeFields = ["page", "limit"];
    removeFields.forEach((param) => delete reqQuery[param]);
  
    let queryStr = JSON.stringify(reqQuery);
  
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
    //finding resource
    query = model.find(JSON.parse(queryStr));
  
    query = query.sort("-imported_t");
  
    //pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();
    query = query.skip(startIndex).limit(limit);
  
  if(populate){
      query = query.populate(populate)
  }
    //executing query
    const results = await query;
    //pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
  
    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results
    }
    next()
  };
  
  module.exports = advancedResults