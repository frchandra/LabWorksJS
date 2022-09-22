const RequestParamMiddleware = (model) => async (req, res, next) =>{
    /*
   * if title is requested
   * */
    if("title" in req.query){
        req.query.title.regex = '.*' + req.query.title.regex + '.*';
        /*
        * adding option "i" for ignoring case sensitive
        * */
        req.query.title['$options'] = "i";
    }

    let query;
    /*
    * copying request query from url
    * */
    const  reqQuery = { ...req.query};

    /*
    * Fields to exclude, (url sanitation)
    * */
    const removeFields = ['select', 'sort', 'page', 'perPage'];

    //todo: heck
    /*
    * loop over removeFields then deleting them from reqQuery
    * */
    removeFields.forEach(params => delete reqQuery[params]);

    /*
    * modified url query: inserting "$" to "regex" ("regex" => "$regex") field so the database could read the query
    * */
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(regex)\b/, match => `$${match}`);

    /*
    * defining query
    *  */
    query = model.find(JSON.parse(queryStr));

    /*
    * select modules by availability
    * */
    if(req.query.available == "true"){
        query = model.find({$where: "this.quota != this.studentsNum"})
    }

    /*
    * select fields
    * */
    if(req.query.select){
        const fields = req.query.select.split(",").join(' ');
        /*
        * building up the query for select operation
        * */
        query = query.select(fields);
    }

    //todo(done): doubly select
    /*
    * sort the data
    * */
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        /*
        * builds the query for sort operation
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
    const modulesPerPage = parseInt(req.query.perPage, 10) || 3;
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
            // pagination.next = {page: page + 1, modulesPerPage};
            pagination.next = page + 1;
        }
        if(startIndex > 0){
            pagination.prev = page - 1;
        }

        // res.status(200).json({success: true, count: result.length, pagination: pagination, data: result});
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