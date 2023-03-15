const mysql = require ('mysql');

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port : 3306 ,
    password: '',
    database: 'SEAElectronics'
});
//connect 
db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('Mysql Connected...');
});

module.exports = db;

/*
//create DB
app.get('/createdb',(req,res)=>{
    let sql = 'CREATE DATABASE SEAElectronics';
    db.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Database created..');
    });
});

*/