import mongoose from 'mongoose';

const questSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    nickname: {
      type: String,
      required: true,
    },
    daily: {
      yeoro: { type: Boolean, default: false },
      chuchu: { type: Boolean, default: false },
      lachelein: { type: Boolean, default: false },
      arcana: { type: Boolean, default: false },
      morass: { type: Boolean, default: false },
      esfera: { type: Boolean, default: false },
      cernium: { type: Boolean, default: false },
      burningCernium: { type: Boolean, default: false },
      arcs: { type: Boolean, default: false },
      odium: { type: Boolean, default: false },
    },
    weekly: {
      yeoro: { type: Boolean, default: false },
      chuchu: { type: Boolean, default: false },
      lachelein: { type: Boolean, default: false },
      arcana: { type: Boolean, default: false },
      morass: { type: Boolean, default: false },
      esfera: { type: Boolean, default: false },
    },
  },
  {
    versionKey: false,
  }
);

const Todo = mongoose.model('Todo', questSchema);

export default Todo;
