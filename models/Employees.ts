import mongoose from "mongoose";

const EmployeesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.employees ||
  mongoose.model("employees", EmployeesSchema);
