const mysql = require('mysql');
const db = require('./metier/singeltonConnection');

//insert 
app.get('/addadmin', (req,res)=>{
    let user = {nom:'Name',prénom:'PName',email:'admin@gmail.com',numéro:'22 222 222',password:'admin'};
    let sql = 'INSERT INTO seaelectronics.users SET ?';
    let query = db.query(sql,user, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Admin Created...');
    });
});

//select 
app.get('/getadmin', (req,res)=>{
    let sql = 'SELECT * FROM seaelectronics.users';
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('users fetched...');
    });
});

//update 
app.get('/update', (req,res)=>{
    let numéro = '55 555 555';
    let sql = `UPDATE seaelectronics.users SET numéro = '${numéro}' WHERE email ='admin@gmail.com' `;
    let query = db.query(sql,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('updated...');
    });
});

//delete 
//  /delete/:id ===========${req.params.id}
app.get('/delete', (req,res)=>{
    let sql = `DELETE FROM seaelectronics.users WHERE email ='admin@gmail.com' `;
    let query = db.query(sql,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('deleted...');
    });
});