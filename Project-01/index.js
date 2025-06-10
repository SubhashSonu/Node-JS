const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

//Routes
app.get('/api/users',(req,res)=>{
    return res.json(users);
})



app.get('/users',(req,res)=>{
    const html =`
    <ul>
    ${users.map((user) =>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `

    return res.send(html);
})

app.post('/api/users',(req,res) =>{
    // create a new user

    return res.json({status: "pending"})
    
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
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);

})
.patch((req,res)=>{
    // Edit user with id
    res.json({status : "pending"})
})
.delete((req,res)=>{
    // Delete user with id
    return res.json({status : "Pending"})
})

app.listen(port,()=>{
    console.log(`Server Started at Port:${port}`);
})


