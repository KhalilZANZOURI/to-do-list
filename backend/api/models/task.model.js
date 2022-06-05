import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },

});

const Task = mongoose.model("tasks", TaskSchema);

export default Task;