import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Task',
    required: true
  }]
},

{ versionKey: false },);

const List = mongoose.model("lists", ListSchema);

export default List;