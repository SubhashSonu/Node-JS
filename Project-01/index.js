const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

// const users = require("./MOCK_DATA.json");


const app = express();
const port = 8000;

// connection
mongoose.connect("mongodb://127.0.0.1:27017/your-app-1")
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log("Mongo Error", error));

// Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,

    },
    job_title: {
        type: String,

    },
},{
    timestamps: true
});

const user = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Hello from middleware 1");

    fs.appendFile("log.txt",
        `${Date.now()}: ${req.method}: ${req.path}\n`,
        (error, data) => {
            next();
        }
    )
});



//Routes
app.get('/api/users', async(req, res) => {
    const allDbUsers = await user.find({});
    // res.setHeader("X-myName", "Subhash Kumar"); // custom header
    // Always add X to custom header
    console.log(req.headers);
    return res.json(allDbUsers);
})



app.get('/users',  async(req, res) => {
    const allDbUsers = await user.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `

    return res.send(html);
})


/*
app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);

})


app.patch('/api/users/:id',(req,res) =>{
    // Edit the user with id

    return res.json({status: "pending"})
})
app.delete('/api/users/:id',(req,res) =>{
    // delete the user with id

    return res.json({status: "pending"})
})
*/

app.route('/api/users/:id')
    .get( async(req, res) => {
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

    })
    .patch(async(req, res) => {
        // Edit user with id
        await user.findByIdAndUpdate(req.params.id,{email: "changed"})
        res.json({ status: "Success" })
    })

    .delete(async (req, res) => {
        await user.findByIdAndDelete(req.params.id)
        return res.json({ status: "Success" });
    });

app.post('/api/users', async (req, res) => {
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

    // console.log("result",result);
    
    return res.status(201).json({msg: "success"});
    // users.push({ id: users.length + 1, ...body });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
    //     return res.status(201).json({ status: "success", id: users.length })
    // })

});

app.listen(port, () => {
    console.log(`Server Started at Port:${port}`);
})


