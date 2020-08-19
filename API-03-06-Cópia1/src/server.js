"use strict";
exports.__esModule = true;
var express = require("express");
var mysql_factory_1 = require("./mysql_factory");
var cors = require("cors");
var bodyParser = require("body-parser");
//const app: express.Application = express();
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
var port = 3000;
var mysql = require('mysql');
app.post("/logon", function (req, res) {
    console.log(req.body);
    var sql = 'select * from usuarios where usuarios.usuario = \'' + req.body.userName + '\' and usuarios.senha = \'' + req.body.password + '\'';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        console.log(data);
        if (!data.length || data.length != 1) {
            res.status(401).send('fodeuse');
            return;
        }
        res.send({
            userName: req.body.userName,
            password: req.body.password,
            role: data.role
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.post("/cadastro", function (req, res) {
    console.log(req.body);
    var sql = 'insert into usuarios(usuario, senha, nome, sobrenome, permissao ) values(\'' + req.body.userName + '\', \'' + req.body.password + '\',\'' + req.body.Nome + '\',\'' + req.body.Sobrenome + '\', \'' + req.body.Permission + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            userName: req.body.userName,
            password: req.body.password,
            Nome: req.body.Nome,
            Sobrenome: req.body.Sobrenome,
            Permission: req.body.Permission
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/om", function (req, res) {
    console.log(req.body);
    var sql = 'select * from ordemmanutencao';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/users", function (req, res) {
    console.log(req.body);
    var sql = 'select * from usuarios';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Error');
    });
});
app.post("/criarOm", function (req, res) {
    console.log(req.body);
    var sql = 'insert into ordemmanutencao(categoria, assunto, descricao) values(\'' + req.body.Categoria + '\', \'' + req.body.Assunto + '\',\'' + req.body.Descricao + '\')';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            Categoria: req.body.Categoria,
            Assunto: req.body.Assunto,
            Descricao: req.body.Descricao
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
