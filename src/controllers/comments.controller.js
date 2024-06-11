import Comment from "../models/comments.js";

import Blog from "../models/blog.model.js";
import User from "../models/User.js";
import { format } from "date-fns";
export const addComment = async (req, res) => {
    try {
        const { comment, postId, idUser } = req.body;

        // Verifica si el post existe
        const blogPost = await Blog.findById(postId);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        // Obtén el nombre de usuario
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newComment = new Comment({ comment, postId, idUser});
        const saveComment = await newComment.save();

        // Añade el comentario al post
        blogPost.comments.push(saveComment._id);
        await blogPost.save();

        return res.status(200).json({ message: "Comment added successfully", saveComment });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }
};

export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId })
            .populate("idUser", "name")
            .exec();

        // Formatear las fechas de los comentarios
        const formattedComments = comments.map(comment => {
            return {
                ...comment.toObject(),
                date: format(new Date(comment.createdAt), 'MM/dd/yyyy, h:mm:ss a')
            };
        });
        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this post" });
        }

        return res.status(200).json(formattedComments);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }
};