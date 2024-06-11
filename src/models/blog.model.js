// Cada publicación debe tener un título, contenido y la opción de adjuntar imágenes.
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const blogSchema = new Schema(
    {

        idUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title:{
            type: String,
            required: true
        },
        content:{
            type: String
        },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]  ,
        front_image: {
            publicId: {
                type: String,
            },
            secureUrl: {
                type: String,
            },
        },
        back_image: {
            publicId: {
                type: String,
            },
            secureUrl: {
                type: String,
            },
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)
blogSchema.plugin(mongoosePaginate)
export default model("Blog", blogSchema);