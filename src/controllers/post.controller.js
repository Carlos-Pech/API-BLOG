import Blog from "../models/blog.model.js";
import fs from "fs-extra";
import mongoose from "mongoose"
import { uploadImage, deleteImage } from "../utils/cloudinary.js";



export const postBlog = async (req, res) => {
    try {
        const { title, content, idUser } = req.body;

        const newBlog = new Blog({

            // newBlog
            idUser:idUser,
            title,
            content,
        });

        // Verificar si req.files está definido
        if (req.files) {
            const { imagePost } = req.files;

            if (imagePost) {
                const resultfrontImage = await uploadImage(
                    imagePost.tempFilePath
                );

                newBlog.imagePost = {
                    publicId: resultfrontImage.public_id,
                    secureUrl: resultfrontImage.secure_url,
                };

                fs.unlink(imagePost.tempFilePath, (err) => {
                    if (err) {
                        console.error(`Error deleting front image temp file: ${err.message}`);
                    }
                });
            }
        } else {
            console.warn('No files were uploaded.');
        }

        const productSave = await newBlog.save();
        return res
            .status(201)
            .json({ message: "Created Post", productSave });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }
};

export const getAllPost = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const response = await Blog.paginate(
            {},
            {
                limit,
                page,
                sort: { createdAt: -1 },
                populate: {
                    path: 'idUser',
                    select: 'name' 
                }
            }
        );

        // Formatear la respuesta para incluir el nombre del usuario
        const formattedResponse = {
            ...response,
            docs: response.docs.map(post => ({
                ...post._doc,
                userName: post.idUser.name // Añadimos el nombre del usuario a la respuesta
            }))
        };

        return res.status(200).json(formattedResponse);
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }
};
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (blog.imagePost && blog.imagePost.publicId) {
            await deleteImage(blog.imagePost.publicId);
        }

        if (blog.back_image && blog.back_image.publicId) {
            await deleteImage(blog.back_image.publicId);
        }

        return res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        const updateFields = req.body;

        const updatedPostUser = await Blog.findByIdAndUpdate(
            id,
            updateFields,
            {
                new: true,
            }
        );

        if (!updatedPostUser) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (req.files?.imagePost) {
            const resultFrontImage = await uploadImage(
                req.files.imagePost.tempFilePath
            );
            updateFields.imagePost = {
                publicId: resultFrontImage.public_id,
                secureUrl: resultFrontImage.secure_url,
            };

            if (
                updatedPostUser.imagePost &&
                updatedPostUser.imagePost.publicId
            ) {
                await deleteImage(updatedPostUser.imagePost.publicId);
            }

            fs.unlink(req.files.imagePost.tempFilePath);
        }

        if (req.files?.back_image) {
            const resultBackImage = await uploadImage(
                req.files.back_image.tempFilePath
            );
            updateFields.back_image = {
                publicId: resultBackImage.public_id,
                secureUrl: resultBackImage.secure_url,
            };

            if (
                updatedPostUser.back_image &&
                updatedPostUser.back_image.publicId
            ) {
                await deleteImage(updatedPostUser.back_image.publicId);
            }

            fs.unlink(req.files.back_image.tempFilePath);
        }

        const updatedPostUserWithImages = await Blog.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        const response = {
            data: updatedPostUserWithImages,
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);

        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: "Invalid Id" });
        }

        return res.status(500).json({ message: "Something went wrong" });
    }
};
