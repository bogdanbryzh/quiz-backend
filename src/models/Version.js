import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const VersionSchema = Schema({
  major: { type: Number, required: true },
  minor: { type: Number, required: true },
  patch: { type: Number, required: true },
});

const VersionModel = model('Version', VersionSchema);

export { VersionModel };
