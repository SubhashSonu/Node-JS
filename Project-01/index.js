const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
   
   fs.appendFile("log.txt",
    `${Date.now()}: ${req.method}: ${req.path}\n`,
    (error,data) =>{
        next();
    }
   )
});



//Routes
app.get('/api/users', (req, res) => {

    res.setHeader("X-myName","Subhash Kumar"); // custom header
    // Always add X to custom header
    console.log(req.headers);
    return res.json(users);
})



app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
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
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);

        if(!user)
            return res.status(404).json({
        error: "user not found"
        })
        return res.json(user);

    })
    .patch((req, res) => {
        // Edit user with id
        res.json({ status: "pending" })
    })

    .delete((req, res) => {
        // Delete user with id
        return res.json({ status: "Pending" })
    });

app.post('/api/users', (req, res) => {
    // create a new user
    const body = req.body;
    // console.log("Body", body);
    if(!body || !body.first_name || !body.email || !body.last_name) return res.status(400).json({
        msg : "All fields are required"
    });
    users.push({ id: users.length + 1, ...body });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
        return res.status(201).json({ status: "success", id: users.length })
    })

});

app.listen(port, () => {
    console.log(`Server Started at Port:${port}`);
})


