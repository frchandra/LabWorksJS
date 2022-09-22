const Module = require('../models/Module');
const ErrorResponse = require("../utils/ErrorResponse");

/*
* @description  get all lab modules data
* @route        GET /api/v1/module
* @access       public
* */
exports.findAll = async (req, res, next) => {
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
    query = Module.find(JSON.parse(queryStr));

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
        * building up the query for sort operation
        * */
        query = query.sort(sortBy);
    } else {
        query = query.sort({'dateStart': 1, 'timeStart.hours': 1});
    }

    /*
    * pagination
    * */
    const page = parseInt(req.query.page, 10) || 1;
    const modulesPerPage = parseInt(req.query.perPage, 10) || 3;
    const startIndex = (page - 1) * modulesPerPage;
    const endIndex = page * modulesPerPage;
    const totalModules = await Module.countDocuments();

    query = query.skip(startIndex).limit(modulesPerPage);

    /*
    * execute the query
    * */
    try{
        const requestedModules = await query;
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

        res.status(200).json({success: true, count: requestedModules.length, pagination: pagination, data: requestedModules});
    }catch (e) {
        next(e);
    }
}

/*
* @description  get one lab modules data by id
* @route        GET /api/v1/module/:id
* @access       public
* */
exports.findOne = async (req, res, next) => {
    try{
        const requestedModule = await Module.findById(req.params.id);
        if(!requestedModule){
            return next(new ErrorResponse(`Cannot find modules with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: requestedModule});
    }catch (e) {
        next(e);
    }
}

/*
* @description  create a lab modules data
* @route        POST /api/v1/module
* @access       private
* */
exports.create = async (req, res, next) => {
    try {
        const createdModule  = await Module.create(req.body);
        res.status(201).json({success: true, data: createdModule});
    }catch (e) {
        next(e);
    }

}

/*
* @description  update a lab modules data
* @route        PUT /api/v1/module/:id
* @access       private
* */
exports.update = async (req, res, next) => {
    try{
        const requestedModule = await Module.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!requestedModule){
            return next(new ErrorResponse(`Cannot find modules with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: requestedModule});
    }catch (e) {
        next(e);
    }

}

/*
* @description  delete a lab modules data
* @route        DELETE /api/v1/module/:id
* @access       private
* */
exports.delete = async (req, res, next) => {
    try{
        const requestedModule = await Module.findByIdAndDelete(req.params.id);
        if(!requestedModule){
            return next(new ErrorResponse(`Cannot find modules with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: {}});
    }catch (e) {
        next(e);
    }
}
