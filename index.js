const mysql = require('mysql');
const express =require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database: 'EmployeeDB',
    multipleStatements:true
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB COnnection Succeded.');
    else
    console.log('DB Connection failed \n Error :'+ JSON.stringify(err, undefined, 2));
});

app.listen(3000, ()=>console.log('Express Server is running at port no :3000'));


// Get all employees
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee',(err, rows, fields)=>{
        if(!err)
       // console.log(rows[0].Name);
       res.send(rows);
        else
        console.log(' Emp data is not showing \n ERROR :'+ err);
    })
});

// Get an employee
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee where EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
       // console.log(rows[0].Name);
       res.send(rows);
        else
        console.log(' Emp data is not showing \n ERROR :'+ err);
    })
});

// Delete an employee
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM Employee where EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
       // console.log(rows[0].Name);
       res.send('DEleted Successfully');
        else
        console.log(' Emp data is not showing \n ERROR :'+ err);
    })
});

// Insert an employee
app.post('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID =?; SET @Name=?; SET @EmpCode =?; SET @Salary =?; \
     CALL EmployeeAddOrEdit(@EmpID,@Name,@Empcode,@Salary);"
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.Empcode ,emp.Salary],(err, rows, fields)=>{
        if(!err)
       rows.forEach(element => {
           if(element.constructor == Array)
           res.send('Inserted Employee ID : '+ element[0].EmpID);
       });
        else
        console.log(' Emp data is not showing \n ERROR :'+ err);
    })
});

// Update an employee
app.put('/employees',(req,res)=>{
    let emp = req.body;
    var sql = "SET @EmpID =?; SET @Name=?; SET @EmpCode =?; SET @Salary =?; \
     CALL EmployeeAddOrEdit(@EmpID,@Name,@Empcode,@Salary);"
    mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.Empcode ,emp.Salary],(err, rows, fields)=>{
        if(!err)
       rows.forEach(element => {
           if(element.constructor == Array)
           res.send('Updated Successfully  ');
       });
        else
        console.log(' Emp data is not showing \n ERROR :'+ err);
    })
});
