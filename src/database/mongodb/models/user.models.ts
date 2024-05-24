import mongoose from "mongoose";
import { ROLES } from "../../../domain/enums/role.enum";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'name is required'],
        },
        email:{
            type: String,
            required: [true, 'email is required'],
        },
        password:{
            type: String,
            required: [true, 'password is required'],
        },

        role:{
            type: String,
            enum: Object.values(ROLES),
            required: [true, 'role is required'],
        },

        img:{
            type: String,
        }

    });

export const UserModel = mongoose.model('User', userSchema);
