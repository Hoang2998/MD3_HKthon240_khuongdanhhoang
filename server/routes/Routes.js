const express = require('express')
const route = express.Router()
const db = require('../config/database')
const jwb = require('jsonwebtoken')
const {verifyToken} = require('../middleware/veritifyToken')
const { checkValidate } = require('../middleware/checkValidate')


route.post('/login',checkValidate,async (req, res) => {
    const {email ,password} = req.body
    const [user] = await db.execute('SELECT * FROM user WHERE email = ? ', [email])
    if(user[0]){
        if(user[0].password == password ){
            const token = jwb.sign(
                {
                    id:user[0].id,
                    email:user[0].email,
                    role:user[0].role
                }
                , process.env.JWT_SECRET
                ,{expiresIn:"5m"}
                )
    
            return res.status(200).json({
                message:"login success",
                type:"success",
                token:token
            })
        }
        return res.status(400).json({
            message:"password incorrect",
            type:"error",
        })
        
    }
    res.status(400).json({
        message:"email incorrect",
        type:"error",
    })
})

route.get('/todolists', async (req, res) => {
    const [data] = await db.execute('SELECT * FROM todo')
    // console.log(data)
    res.status(200).json({
        message:"success",
        data:data
    })
})
route.post('/todolists',verifyToken,async (req, res) => {
    const {name ,status} = req.body
    if(name){
        const [data] = await db.execute('INSERT INTO todo (name) VALUES (?)', [name])
    return res.status(201).json({
        message:"success",
        type:"success",
    })
    }
         res.status(400).json({
        message:" bạn chưa điền tên công việc ",
        type:"error",
    })
})

route.delete('/todolists/:id', verifyToken,async (req, res) => {
    const {id} = req.params
    const [data] = await db.execute('DELETE FROM todo WHERE id = ?', [id])
    res.status(200).json({
        message:"delete success",
    })
})
route.put('/todolists/:id', verifyToken,async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    const [data] = await db.execute('UPDATE todo SET name = ? WHERE id = ?', [name, id])
    res.status(200).json({
        message:"update success",
        type:"success",
    })
})

route.put('/todolists/edit/:id',verifyToken ,async (req, res) => {
    const {id} = req.params
    const {status} = req.body
    const [data] = await db.execute('UPDATE todo SET status = ? WHERE id = ?', [status, id])
    res.status(200).json({
        message:"update success",
    })
})

module.exports = route