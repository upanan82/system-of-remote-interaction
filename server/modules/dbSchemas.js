/*
    Module for creating database queries.
    Module containing database schemas.
*/

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Model for students
const studentsSchema = new Schema({
    id: ObjectId,
    userName: String,
    pass: String
});
export const StudentsModel = mongoose.model('users', studentsSchema);
