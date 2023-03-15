const db =require('../metier/singeltonConnection');

class User {
    static getAll(callback) {
        const sql = 'SELECT * FROM users';
        db.query(sql, callback);
    }

    static getByEmail(email, callback) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    }

    static create(user, callback) {
        const sql = 'INSERT INTO users (nom,prénom ,email,numéro, password) VALUES (?,?,?,?,?)';
        db.query(sql, [user.nom,user.prénom, user.email,user.numéro, user.password], callback);
    }

    static update(email, user, callback) {
        const sql = 'UPDATE users SET nom = ?, prénom=?,email = ?,numéro=?, password = ? WHERE email =?';
        db.query(sql, [user.nom,user.prénom, user.email,user.numéro, user.password,email], callback);
    }

    static delete(email, callback) {
        const sql = 'DELETE FROM users WHERE email = ?';
        db.query(sql, [email], callback);
    }


    static CheckForUserExists(email,callback){
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], callback);
        if (error) throw error;
        if (results.length > 0) {
            res.status(400);
            throw new Error('User already exists');
        } else {
          /*  const sql = 'INSERT INTO users (nom,prénom ,email,numéro, password) VALUES (?,?,?,?,?)';
            db.query(sql, [user.nom,user.prénom, user.email,user.numéro, user.password], callback);*/
        }

    }


   
}

module.exports = User;


/*const User = require('./models/userModel');
const updatedUser = {nom:'Name2',prénom:'PName2',email:'admin2@gmail.com',numéro:'5566542',password:'adminadmin'};
User.update('admin@gmail.com', updatedUser, (err, result) => {
    if (err) {
        console.error('Error updating user:', err);
        return;
    }
    console.log(result);
});*/


