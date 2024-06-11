import Blog from "../models/blog.model.js";
import fs from "fs-extra";
import mongoose from "mongoose"
import { uploadImage, deleteImage } from "../utils/cloudinary.js";



export const postBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newBlog = new Blog({
            // newBlog
            title,
            content,
        });

        // Verificar si req.files está definido
        if (req.files) {
            const { front_image, back_image } = req.files;

            if (front_image) {
                const resultfrontImage = await uploadImage(
                    front_image.tempFilePath
                );

                newBlog.front_image = {
                    publicId: resultfrontImage.public_id,
                    secureUrl: resultfrontImage.secure_url,
                };

                // Asegúrate de manejar el error en fs.unlink
                fs.unlink(front_image.tempFilePath, (err) => {
                    if (err) {
                        console.error(`Error deleting front image temp file: ${err.message}`);
                    }
                });
            }

            if (back_image) {
                const resultbackImage = await uploadImage(back_image.tempFilePath);

                newBlog.back_image = {
                    publicId: resultbackImage.public_id,
                    secureUrl: resultbackImage.secure_url,
                };

                // Asegúrate de manejar el error en fs.unlink
                fs.unlink(back_image.tempFilePath, (err) => {
                    if (err) {
                        console.error(`Error deleting back image temp file: ${err.message}`);
                    }
                });
            }
        } else {
            console.warn('No files were uploaded.');
        }

        const productSave = await newBlog.save();
        return res
            .status(201)
            .json({ message: "Created Product", productSave });
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
            }
        );
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" ,error: error.message});
    }
}; 
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (blog.front_image && blog.front_image.publicId) {
            await deleteImage(blog.front_image.publicId);
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

        if (req.files?.front_image) {
            const resultFrontImage = await uploadImage(
                req.files.front_image.tempFilePath
            );
            updateFields.front_image = {
                publicId: resultFrontImage.public_id,
                secureUrl: resultFrontImage.secure_url,
            };

            if (
                updatedPostUser.front_image &&
                updatedPostUser.front_image.publicId
            ) {
                await deleteImage(updatedPostUser.front_image.publicId);
            }

            fs.unlink(req.files.front_image.tempFilePath);
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
