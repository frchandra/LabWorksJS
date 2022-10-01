const RequestParamMiddleware = (model) => async (req, res, next) =>{
    /*
   * if title is requested, concat the 'value' to '.*value.*' to support 'LIKE' query operators
   * */
    if("title" in req.query){
        req.query.title = {'$regex': '.*' + req.query.title + '.*'};
        /*
        * adding option "i" for ignoring case sensitivity
        * */
        req.query.title['$options'] = "i";
        console.log('bug');console.log(req.query);
    }
    /*
    * Initiate the query object that will be chained
    * */
    let query;
    /*
    * copying request query from url
    * */
    const reqQuery = { ...req.query};
    /*
    * Fields to exclude, (url sanitation)
    * This fields use for operation and does not exist in the schema
    * thus should be excluded from the query
    * */
    const removeFields = ['select', 'sort', 'page', 'perPage', 'available'];
    //todo: heck
    /*
    * loop over removeFields then deleting them from reqQuery
    * */
    removeFields.forEach(params => delete reqQuery[params]);
    /*
    * modified url query: inserting "$" to "{operand}" field so the database could read the query (i.e. "gte" => "$gte")
    * */
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/, match => `$${match}`);
    /*
    * defining query
    *  */
    query = model.find(JSON.parse(queryStr));

    /*
    * chain the query if select modules by availability is set true
    * */
    if(req.query.available == "true"){
        query = query.find({$where: "this.quota != this.studentsNum"})
    }
    /*
    * select fields, chain the query
    * */
    if(req.query.select){
        const fields = req.query.select.split(",").join(' ');
        /*
        * chaining up the query for select operation
        * */
        query = query.select(fields);
    }
    //todo(done): doubly select
    /*
    * sort the data by selected fields
    * */
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        /*
        * chains the query for sort operation
        * */
        query = query.sort(sortBy);
    } else {
        /*
        * the default sorting logic is by dateStart and timeStart
        * */
        query = query.sort({'dateStart': 1, 'timeStart.hours': 1});
    }
    /*
    * pagination
    * */
    const page = parseInt(req.query.page, 10) || 1;
    const modulesPerPage = parseInt(req.query.perPage, 10) || 20;
    const startIndex = (page - 1) * modulesPerPage;
    const endIndex = page * modulesPerPage;
    const totalModules = await model.countDocuments();
    query = query.skip(startIndex).limit(modulesPerPage);
    /*
    * execute the query
    * */
    try{
        const result  = await query;
        /*
        * pagination result
        * */
        const pagination = {};
        pagination.current = page;
        pagination.modulesPerPage = modulesPerPage;
        if(endIndex < totalModules){
            pagination.next = page + 1;
        }
        if(startIndex > 0){
            pagination.prev = page - 1;
        }

        res.RequestParamMiddleware = {
            success: true,
            count: result.length,
            pagination: pagination,
            data: result
        };
        next();
    }catch (e) {
        next(e);
    }
};

module.exports = RequestParamMiddleware;