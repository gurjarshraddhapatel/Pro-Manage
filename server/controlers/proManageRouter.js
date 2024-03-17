const ToDo = require("../models/proManage");
const generateTokenAnsSetCookie = require("../utils/generatetToken");

const todoList = async (req, res) => {
  try {
    const { title, priority, todos, date, checkedCount, user } = req.body;
    const newTodo = new ToDo({
      title,
      priority,
      todos,
      date,
      checkedCount,
      user,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error creating todo item:", err);
    res.status(500).json({ error: "Failed to create todo item" });
  }
};

const getTodo = async (req,res)=>{
      try {
        const todos = await ToDo.find();

        res.status(200).json(todos);
      } catch (error) {
        console.error("Error fetching todos:", err);
        res.status(500).json({ error: "Failed to fetch todos" });
      }
}

module.exports = {todoList,getTodo};
