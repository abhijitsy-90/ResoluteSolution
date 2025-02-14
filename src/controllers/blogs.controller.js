const logger = require('./logger');
let blogModel = require('../models/blog.model')
const Joi=require('joi');

const BlogSchema = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    content: Joi.string().min(18).max(100).required(),
    Id:Joi.number().required()
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.CreateBlogs = async (req, res) => {
    const { Id, title, content } = req.body;

    const { error } = BlogSchema.validate({title,content,Id});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const Existedblog = blogModel.find((item) => item?.title == title);
        if (Existedblog) return res.status(409).json({ error: "This Blog already existed" });
        let BlogId = getRandomInt(50, 1000)
        blogModel.push({ title, author: Id, content, status: "draft", createdAt: new Date(), id: BlogId });
        return res.status(200).json({ message: "Blog created successfully" });

    } catch (err) {
        logger.error({
            functionName: 'CreateBlogs',
            method: req.method,
            body: req.body,
            params: req.params,
            errorMessage: err.message,
        }, "Error occurred in CreateBlogs function");
        return res.status(500).send({ status: false, message: err.message })
    }
}

exports.GetBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const blogs = blogModel.slice(startIndex, endIndex);
        return res.status(200).json({
            status: true,
            currentPage: page,
            totalPages: Math.ceil(blogModel.length / limit),
            totalBlogs: blogModel.length,
            blogs
        });
    } catch (err) {
        logger.error({
            functionName: 'GetBlogs',
            method: req.method,
            body: req.body,
            params: req.params,
            errorMessage: err.message,
        }, "Error occurred in GetBlogs function");
        return res.status(500).send({ status: false, message: err.message });
    }
};

exports.GetSingleBlogs = async (req, res) => {
    const { id } = req.params;
    try {
        const data = blogModel.find((item) => {
            return item.id == id
        })
        return res.status(200).json(data);
    } catch (err) {
        logger.error({
            functionName: 'GetSingleBlogs',
            method: req.method,
            body: req.body,
            params: req.params,
            errorMessage: err.message,
        }, "Error occurred in GetSingleBlogs function");
        return res.status(500).send({ status: false, message: err.message })
    }
}
exports.UpdateBlogs = async (req, res) => {
    const { Id, title, content, status } = req.body;
    const { error } = BlogSchema.validate({title,content,Id});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        if (!title) return res.status(400).json({ error: "title is mandatory " })
        if (!content) return res.status(400).json({ error: "content is mandatory " })

        blogModel = blogModel.map((item) =>
            item.id == Id ? { id: item.id, title, content, status } : item
        )
        return res.status(200).json({ message: "Blog updated successfully" });
    } catch (err) {
        logger.error({
            functionName: 'UpdateBlogs',
            method: req.method,
            body: req.body,
            params: req.params,
            errorMessage: err.message,
        }, "Error occurred in UpdateBlogs function");
        return res.status(500).send({ status: false, message: err.message })
    }
}
exports.DeleteBlogs = async (req, res) => {
    let { Id } = req.params;
    Id = parseInt(Id);
    try {
        blogModel = blogModel.filter((item) => item.id !== Id);
        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
        logger.error({
            functionName: 'DeleteBlogs',
            method: req.method,
            body: req.body,
            params: req.params,
            errorMessage: err.message,
        }, "Error occurred in DeleteBlogs function");
        return res.status(500).send({ status: false, message: err.message })
    }
}