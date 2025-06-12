const user = require("../models/user")

async function handleGetAllUsers(req,res){
    const allDbUsers = await user.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
     // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id);
       try{
        const User = await user.findById(req.params.id);

        if (!User)
            return res.status(404).json({
                error: "user not found"
            })
        return res.json(User);
       } catch(error){
        // Handles invalid ID format and other errors
      return res.status(500).json({ error: "Server error", details: error.message });
       }

    }

async function handleEditUserById(req,res){
     // Edit user with id
        await user.findByIdAndUpdate(req.params.id,{email: "changed"})
        return res.json({ status: "Success" })
}

async function handleDeleteUserById(req,res){
       await user.findByIdAndDelete(req.params.id)
        return res.json({ status: "Success" });
}

async function handleCreateUser(req,res){
      // create a new user
    const body = req.body;
    // console.log("Body", body);
    if (!body || !body.first_name || !body.email || !body.last_name || !body.gender || !body.job_title) return res.status(400).json({
        msg: "All fields are required"
    });

    const result = await user.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,

    });

    
    return res.status(201).json({msg: "success",id: result._id});
}


module.exports = {
  handleGetAllUsers, 
  handleGetUserById, 
  handleEditUserById,
  handleDeleteUserById,
  handleCreateUser,
}