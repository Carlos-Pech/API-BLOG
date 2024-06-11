import Blog from "../models/blog.model.js";
import User from "../models/User.js";

export const userPosts = async (req, res) => {
    try {
        const { id_user } = req.params;
        const userPosts = await Blog.find({ idUser: id_user }).select('title content front_image back_image');
        if (userPosts.length === 0) {
            return res.status(404).json({ message: "No posts found for this user" });
        }
        return res.status(200).json(userPosts);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "something went wrong", error: error.message });
    }
}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica si se proporciona una nueva contraseña en la solicitud
        if (req.body.password) {
            // Encripta la nueva contraseña
            req.body.password = await User.encryptPassword(req.body.password);
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updateUser)
            return res.status(404).send({ message: "Id not found" });

        const response = {
            data: updateUser,
        };
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError)
            return res.status(400).send({ message: "Invalid Id" });
        return res.status(500).send("Something went wrong");
    }
};