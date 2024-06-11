// Cada publicación debe tener un título, contenido y la opción de adjuntar imágenes.
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        },
        idUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        // date: {
        //     type: Date,
        //     default: Date.now
        // }
    },
    {
        versionKey: false,
        timestamps: true,  // Asegura que createdAt y updatedAt se manejen automáticamente
    }
);

commentSchema.plugin(mongoosePaginate)
export default model("Comments", commentSchema);