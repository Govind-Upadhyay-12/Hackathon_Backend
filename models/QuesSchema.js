const mongoose =require("mongoose")
const QuestionSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
   
  }, { timestamps: true });
  
  const Question = mongoose.model('Question', QuestionSchema);
  
  module.exports = Question;