"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
/*************************************Sintomas Post\Get\Delete\Update******************************************************/
app.post("/cadSintoma", function (req, res) {
    console.log(req.body);
    var sql = 'insert into sintomas(sintoma) values(\'' + req.body.Sintoma + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            Sintoma: req.body.Sintoma
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/getSintoma", function (req, res) {
    console.log(req.body);
    var sql = 'select * from sintomas';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/pegasintoma/:id", function (req, res) {
    var sql = 'select * from sintomas where idsintomas=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.delete("/deletesintoma/:id", function (req, res) {
    console.log(req.params.id);
    console.log(req.body.sintoma);
    var sql = 'delete from sintomas where sintomas.idsintomas = (\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Error');
    });
});
app.put("/upsintoma/:id", function (req, res) {
    var sql = 'update sintomas set sintoma=(\'' + req.body.Sintoma + '\') where idsintomas=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send('Error');
    });
});
/**********************************************************************************************************/
/*****************************************Causas Post\Get\Delete\Update***********************************************************************/
app.post("/cadCausa", function (req, res) {
    console.log(req.body);
    var sql = 'insert into causas(causa) values(\'' + req.body.Causa + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            Causa: req.body.Causa
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/getCausa", function (req, res) {
    console.log(req.body);
    var sql = 'select * from causas';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/pegacausa/:id", function (req, res) {
    var sql = 'select * from causas where idcausas=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.delete('/deletecausa/:id', function (req, res) {
    console.log(req.params.id);
    var sql = 'delete from causas where causas.idcausas = (\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Error');
    });
});
app.put("/upcausa/:id", function (req, res) {
    var sql = 'update causas set causa=(\'' + req.body.Causa + '\') where idcausas=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
/************************************Maquinas Post/Get/Delete/Update**********************************************************************/
app.post("/cadMaquina", function (req, res) {
    console.log(req.body);
    var sql = 'insert into maquinas(maquina, maqnumb) values(\'' + req.body.Maquina + '\', \'' + req.body.Maqnumb + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            Maquina: req.body.Maquina,
            Maqnumb: req.body.Maqnumb
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/getMaquina", function (req, res) {
    console.log(req.body);
    var sql = 'select * from maquinas';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/pegamaquina/:id", function (req, res) {
    var sql = 'select * from maquinas where idmaquinas=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.delete("/deletemaquinas/:id", function (req, res) {
    console.log(req.params.id);
    var sql = 'delete from maquinas where maquinas.idmaquinas = (\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Error');
    });
});
app.put("/upmaq/:id", function (req, res) {
    var sql = 'update maquinas set maquina=(\'' + req.body.Maquina + '\'), maqnumb=(\'' + req.body.Maqnumb + '\') where idmaquinas=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
/***********************************************************************************************************/
/************************************Setor Post/Get/Delete/Update*********************************************************************/
app.post("/cadSetor", function (req, res) {
    console.log(req.body);
    var sql = 'insert into setores(setor) values(\'' + req.body.Setor + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            Setor: req.body.Setor
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/getSetor", function (req, res) {
    console.log(req.body);
    var sql = 'select * from setores';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/pegasetor/:id", function (req, res) {
    var sql = 'select * from setores where setores.idsetores=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send('Error');
    });
});
app.delete("/deletesetor/:id", function (req, res) {
    console.log(req.params.id);
    var sql = 'delete from setores where setores.idsetores = (\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Error');
    });
});
app.put("/setorup/:id", function (req, res) {
    console.log(req.params);
    console.log(req.body.setor);
    var sql = 'update setores set setor=(\'' + req.body.Setor + '\') where idsetores=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
//****************************Local Post/Get/Delete/Update*********************************************//
app.post("/cadLocal", function (req, res) {
    console.log(req.body);
    var sql = 'insert into locais(local) values(\'' + req.body.Local + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            Local: req.body.Local
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/getLocal", function (req, res) {
    console.log(req.body);
    var sql = 'select * from locais';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/pegalocal/:id", function (req, res) {
    var sql = 'select * from locais where locais.idlocais=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send('Error');
    });
});
app.delete("/deletelocal/:id", function (req, res) {
    console.log(req.params.id);
    var sql = 'delete from locais where locais.idlocais = (\'' + req.params.id + '\')';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Error');
    });
});
app.put("/localupdate/:id", function (req, res) {
    var sql = 'update locais set local=(\'' + req.body.Local + '\') where idlocais=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send('Error');
    });
});
//****************************************************************************//
//******************************************Tipo de Ordem Post/Get/Delete/Update**************************************************************//
app.post("/cadTipo", function (req, res) {
    console.log(req.body);
    var sql = 'insert into tipoordem(tipotipo ) values(\'' + req.body.tipoTipo + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            tipoTipo: req.body.tipoTipo
        });
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/getTipo", function (req, res) {
    console.log(req.body);
    var sql = 'select * from tipoordem';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
        console.log(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/pegatipo/:id", function (req, res) {
    console.log(req.params);
    var sql = 'select * from tipoordem where idtipoOrdem=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.delete("/deltipo/:id", function (req, res) {
    console.log(req.params.id);
    var sql = 'delete from tipoordem where tipoordem.idtipoOrdem = (\'' + req.params.id + '\')';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Error');
    });
});
app.put("/testeupdate/:id", function (req, res) {
    console.log(req.params);
    console.log(req.body.tipoTipo);
    var sql = 'update tipoordem set tipotipo=(\'' + req.body.tipoTipo + '\') where idtipoOrdem=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send('Error');
    });
});
//************************************************************************************************//
//************************************Usuários Post/Get/Delete/Update*****************************************//
app.post("/cadastro", function (req, res) {
    console.log(req.body);
    var sql = 'insert into usuarios(usuario, senha, nome, sobrenome, nivel ) values(\'' + req.body.userName + '\', \'' + req.body.password + '\',\'' + req.body.Nome + '\',\'' + req.body.Sobrenome + '\', \'' + req.body.Nivel + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            userName: req.body.userName,
            password: req.body.password,
            Nome: req.body.Nome,
            Sobrenome: req.body.Sobrenome,
            Nivel: req.body.Nivel
        });
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
app.get("/pegauser/:id", function (req, res) {
    var sql = 'select * from usuarios where idusuarios=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.delete("/delusuario/:id", function (req, res) {
    console.log(req.params.id);
    var sql = 'delete from usuarios where usuarios.idusuarios = (\'' + req.params.id + '\')';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Error');
    });
});
app.put("/upusers/:id", function (req, res) {
    var sql = 'update usuarios set nome=(\'' + req.body.Nome + '\'), sobrenome=(\'' + req.body.Sobrenome + '\'), usuario=(\'' + req.body.userName + '\'), nivel=(\'' + req.body.Nivel + '\') where idusuarios=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
//******************************************************************************************************//
//**************************************************Permissões Post/Get/Delete/Update*************************************************************/
app.post("/cadpermissao", function (req, res) {
    var sql = 'insert into permissoes(permissao) values(\'' + req.body.permissao + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send({
            isvalid: true,
            permissao: req.body.permissao
        });
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.get("/getpermissao", function (req, res) {
    var sql = 'select * from permissoes';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.get("/pegapermission/:id", function (req, res) {
    var sql = 'select * from permissoes where idpermissoes=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.delete("/delpermissao/:id", function (req, res) {
    var sql = 'delete from permissoes where permissoes.idpermissoes=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.put("/uppermission/:id", function (req, res) {
    var sql = 'update permissoes set permissao=(\'' + req.body.permissao + '\') where idpermissoes=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
//*************************************************Ordens Post/Get/Update****************************************//
app.get("/omFechada", function (req, res) {
    var sql = 'select * from ordemmanutencao where status="Fechada"';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send('Error');
    });
});
app.get("/om", function (req, res) {
    console.log(req.body);
    var sql = 'select * from ordemmanutencao where status="Aberta"';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(405).send('Ferrou');
    });
});
app.put("/mandandooms/:id", function (req, res) {
    var sql = 'update ordemmanutencao set responsavel=(\'' + req.body.Resp2 + '\'), status="Em Andamento" where idordemmanutencao=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.post("/criarOm", function (req, res) {
    console.log(req.body);
    var sql = 'insert into ordemmanutencao(cat, assunto, numeronota, descricao, permission, local, setor, equip, sintoma, causa, parada, status, responsavel) values(\'' + req.body.Cat + '\', \'' + req.body.Assunto + '\',\'' + req.body.NumeroNota + '\', \'' + req.body.Descricao + '\', \'' + req.body.Permission + '\', \'' + req.body.Local + '\', \'' + req.body.Setor + '\', \'' + req.body.Equip + '\',\'' + req.body.Sintoma + '\', \'' + req.body.Causa + '\', \'' + req.body.Parada + '\', \'' + req.body.Status + '\', \'' + req.body.Resp + '\' )';
    console.log(sql);
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        console.log(error);
        res.status(404).send('Ferrou');
    });
});
app.get("/omsF", function (req, res) {
    var sql = 'select * from ordemmanutencao where status="Em Andamento"';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.get("/pegandoom/:id", function (req, res) {
    var sql = 'select * from ordemmanutencao where idordemmanutencao=(\'' + req.params.id + '\')';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.get("/usersm", function (req, res) {
    var sql = 'select * from usuarios where nivel="Manutentor"';
    new mysql_factory_1.MySQLFactory().getConnection().select(sql).subscribe(function (data) {
        res.send(data);
    }, function (error) {
        res.status(404).send("Error");
    });
});
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
