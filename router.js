const express = require('express');
const router = express.Router();
const db  = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var multer  =   require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'uploads');
  },
   filename: function (req, file, cb) {
     cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage });
//admin
router.post('/login-admin',  (req, res, next) => {
  db.query(
    `SELECT * FROM admin WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email atau Password salah'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Email atau password salah'
            });
          }
          if (bResult) {
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
            db.query(
              `UPDATE admin SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: 'Anda telah Login Admin',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username atau password salah'
          });
        }
      );
    }
  );
});
// user
router.post('/register',upload.single('nama_logo'), function(req,res,next){
  const file = req.file.filename;
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'User ini telah terdaftar'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (nama_desa, nama_kades, username, password, provinsi, kabupaten, nama_logo) VALUES ('${req.body.nama_desa}','${req.body.nama_kades}',
               ${db.escape(
                req.body.username
              )}, ${db.escape(hash)},'${req.body.provinsi}','${req.body.kabupaten}','upload/${file}')`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Selamat anda telah terdaftar'
                });
              }
            );
          }
        });
      }
    }
  );
});

router.put('/update-user/', (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({
            msg: err
          });
        } else {
      if (result.length) {
          db.query(
          `update users SET nama_desa ='${req.body.nama_desa}', nama_kades='${req.body.nama_kades}', password= ${db.escape(hash)}
          ,provinsi='${req.body.provinsi}', kabupaten='${req.body.kabupaten}', nama_logo='${req.body.nama_logo}' 
           where LOWER(username) = LOWER(${db.escape(
            req.body.username
          )}); `,
          (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                msg: err
              });
            }
            return res.status(201).send({
              msg: 'Selamat anda telah berhasi update',
              user: result[0]
            });
          }
        );
      } else {
        return res.status(409).send({
          msg: 'Tidak bisa update'
        });
      }
    }}); }
  );
});

router.delete('/delete-user/:id', (req, res, next) => {
  var id = req.params.id;

  db.query(`DELETE FROM users WHERE users.id ='${id}'`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(201).send({
        msg: 'Selamat anda telah berhasi Menghapus user',
      });
    }
  );
  
 
 
});
router.post('/login-user',  (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email atau Password salah'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Email atau password salah'
            });
          }
          if (bResult) {
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: 'Anda telah Login',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Email atau password salah'
          });
        }
      );
    }
  );
});

router.post('/get-user', signupValidation, (req, res, next) => {


    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){
        return res.status(422).json({
            message: "Please provide the token",
        });
    }

    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

    db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Berhasil Masuk menggunakan JWT token' });
    });


});

router.get('/get-user-all', (req, res, next) => {


  

  db.query('SELECT * FROM users ', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Berhasil Masuk menggunakan JWT token' });
  });


});

// laporan




 
router.post('/laporan',upload.single('file_laporan'), function(req,res,next){
  const file = req.file.filename;
  db.query(
    `INSERT INTO laporan (user_id, nama_laporan, status_laporan, message, file_laporan) VALUES ('${req.body.user_id}','${req.body.nama_laporan}',
     '${req.body.status_laporan}','${req.body.message}','upload/${file}')`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(201).send({
        msg: 'Selamat Laporan anda telah masuk'
      });
    }
  );

  

});

router.put('/laporan-update/:id',upload.single('file_laporan'), (req, res, next) => {
  var id = req.params.id;
  const file = req.file.filename;
 
          db.query(
          `update laporan SET user_id='${req.body.user_id}', nama_laporan ='${req.body.nama_laporan}', status_laporan='${req.body.status_laporan}'
          ,message='${req.body.message}', file_laporan='upload/${file}'
           where id='${id}' `,
          (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                msg: err
              });
            }
            return res.status(201).send({
              msg: 'Selamat anda telah berhasi update Laporan'
            });
          }
        );
     

  
});
module.exports = router;
