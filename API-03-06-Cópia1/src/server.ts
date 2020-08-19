import express = require("express");
import { MySQL } from './mysql';
import { MySQLFactory } from './mysql_factory';
var cors = require("cors");
var bodyParser = require("body-parser");

//const app: express.Application = express();
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

const port: number = 3000;
const mysql = require('mysql');


app.post("/logon", function (req, res) {

    console.log(req.body);

    let sql = 'select * from usuarios where usuarios.usuario = \'' + req.body.userName + '\' and usuarios.senha = \'' + req.body.password + '\'';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
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
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

/*************************************Sintomas Post\Get\Delete\Update******************************************************/
app.post("/cadSintoma", (req, res) => {

    console.log(req.body);
    let sql = 'insert into sintomas(sintoma) values(\'' + req.body.Sintoma + '\' )';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send({
                isvalid: true,
                Sintoma: req.body.Sintoma

            });
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/getSintoma", (req, res) => {

    console.log(req.body);
    let sql = 'select * from sintomas';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/pegasintoma/:id", (req, res) =>{
    let sql = 'select * from sintomas where idsintomas=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send("Error");
        }
    );
});

app.delete("/deletesintoma/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body.sintoma);
    let sql = 'delete from sintomas where sintomas.idsintomas = (\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Error');
        }
    );
});

app.put("/upsintoma/:id", (req, res) =>{
    let sql = 'update sintomas set sintoma=(\'' + req.body.Sintoma + '\') where idsintomas=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send('Error');
        }
    );
});

/**********************************************************************************************************/

/*****************************************Causas Post\Get\Delete\Update***********************************************************************/
app.post("/cadCausa", (req, res) => {

    console.log(req.body);
    let sql = 'insert into causas(causa) values(\'' + req.body.Causa + '\' )';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send({
                isvalid: true,
                Causa: req.body.Causa

            });
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});
app.get("/getCausa", (req, res) => {

    console.log(req.body);
    let sql = 'select * from causas';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/pegacausa/:id", (req, res) =>{
    let sql = 'select * from causas where idcausas=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send("Error");
        }
    );
});

app.delete('/deletecausa/:id', (req, res) => {
    console.log(req.params.id);
    let sql = 'delete from causas where causas.idcausas = (\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Error');
        }
    );
});

app.put("/upcausa/:id", (req, res) =>{
    let sql = 'update causas set causa=(\'' + req.body.Causa + '\') where idcausas=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send("Error");
        }
    );
});


/************************************Maquinas Post/Get/Delete/Update**********************************************************************/
app.post("/cadMaquina", (req, res) => {

    console.log(req.body);
    let sql = 'insert into maquinas(maquina, maqnumb) values(\'' + req.body.Maquina + '\', \'' + req.body.Maqnumb + '\' )';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send({
                isvalid: true,
                Maquina: req.body.Maquina,
                Maqnumb: req.body.Maqnumb

            });
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/getMaquina", (req, res) => {

    console.log(req.body);
    let sql = 'select * from maquinas';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/pegamaquina/:id", (req, res) =>{
    let sql = 'select * from maquinas where idmaquinas=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send("Error");
        }
    );
});

app.delete("/deletemaquinas/:id", (req, res) => {
    console.log(req.params.id);
    let sql = 'delete from maquinas where maquinas.idmaquinas = (\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Error');
        }
    );
});

app.put("/upmaq/:id", (req, res) =>{
    let sql = 'update maquinas set maquina=(\'' + req.body.Maquina + '\'), maqnumb=(\'' + req.body.Maqnumb + '\') where idmaquinas=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send("Error");
        }
    );
});
/***********************************************************************************************************/

/************************************Setor Post/Get/Delete/Update*********************************************************************/
app.post("/cadSetor", (req, res) => {

    console.log(req.body);
    let sql = 'insert into setores(setor) values(\'' + req.body.Setor + '\' )';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send({
                isvalid: true,
                Setor: req.body.Setor

            });
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/getSetor", (req, res) => {

    console.log(req.body);
    let sql = 'select * from setores';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/pegasetor/:id", (req, res) =>{
    let sql = 'select * from setores where setores.idsetores=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send('Error');
        }
    );
});

app.delete("/deletesetor/:id", (req, res) => {
    console.log(req.params.id);
    let sql =  'delete from setores where setores.idsetores = (\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Error');
        }
    );
});

app.put("/setorup/:id", (req, res) =>{
    console.log(req.params);
    console.log(req.body.setor);
    let sql = 'update setores set setor=(\'' + req.body.Setor + '\') where idsetores=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);

        },
        (error: any) =>{
            res.status(404).send("Error");
        }
    );
});

//****************************Local Post/Get/Delete/Update*********************************************//

app.post("/cadLocal", (req, res) => {

    console.log(req.body);
    let sql = 'insert into locais(local) values(\'' + req.body.Local + '\' )';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send({
                isvalid: true,
                Local: req.body.Local

            });
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/getLocal", (req, res) => {

    console.log(req.body);
    let sql = 'select * from locais';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/pegalocal/:id", (req, res) =>{
    let sql = 'select * from locais where locais.idlocais=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send('Error');
        }
    );
});

app.delete("/deletelocal/:id", (req, res) => {
    console.log(req.params.id);
    let sql = 'delete from locais where locais.idlocais = (\'' + req.params.id + '\')';
    console.log(sql)
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Error');
        }
    );
});

app.put("/localupdate/:id", (req, res) =>{
    let sql = 'update locais set local=(\'' + req.body.Local + '\') where idlocais=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send('Error');
        }
    );
});

//****************************************************************************//

//******************************************Tipo de Ordem Post/Get/Delete/Update**************************************************************//

app.post("/cadTipo", (req, res) => {

    console.log(req.body);
    let sql = 'insert into tipoordem(tipotipo ) values(\'' + req.body.tipoTipo + '\' )';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send({
                isvalid: true,
                tipoTipo: req.body.tipoTipo

            });
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/getTipo", (req, res) => {

    console.log(req.body);
    let sql = 'select * from tipoordem';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
            console.log(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/pegatipo/:id", (req, res) =>{
    console.log(req.params);
    let sql = 'select * from tipoordem where idtipoOrdem=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send("Error");
        }
    );
});

app.delete("/deltipo/:id", (req, res) => {
    console.log(req.params.id);
    let sql = 'delete from tipoordem where tipoordem.idtipoOrdem = (\'' + req.params.id + '\')';
    console.log(sql)
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Error');
        }
    );
});

app.put("/testeupdate/:id", (req, res) => {
    console.log(req.params);
    console.log(req.body.tipoTipo);
    let sql = 'update tipoordem set tipotipo=(\'' + req.body.tipoTipo + '\') where idtipoOrdem=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) => {
            res.status(404).send('Error');
        }
    );
});

//************************************************************************************************//

//************************************Usuários Post/Get/Delete/Update*****************************************//

app.post("/cadastro", (req, res) => {

    console.log(req.body);
    let sql = 'insert into usuarios(usuario, senha, nome, sobrenome, nivel ) values(\'' + req.body.userName + '\', \'' + req.body.password + '\',\'' + req.body.Nome + '\',\'' + req.body.Sobrenome + '\', \'' + req.body.Nivel + '\' )';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send({
                isvalid: true,
                userName: req.body.userName,
                password: req.body.password,
                Nome: req.body.Nome,
                Sobrenome: req.body.Sobrenome,
                Nivel: req.body.Nivel

            });
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/users", (req, res) => {
    console.log(req.body);
    let sql = 'select * from usuarios';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Error');
        }
    );
});

app.get("/pegauser/:id", (req, res) =>{
    let sql = 'select * from usuarios where idusuarios=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send("Error");
        }
    );
});

app.delete("/delusuario/:id", (req, res) => {
    console.log(req.params.id);
    let sql = 'delete from usuarios where usuarios.idusuarios = (\'' + req.params.id + '\')';
    console.log(sql)
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Error');
        }
    );
});

app.put("/upusers/:id", (req, res)=>{
    let sql = 'update usuarios set nome=(\'' + req.body.Nome + '\'), sobrenome=(\'' + req.body.Sobrenome + '\'), usuario=(\'' + req.body.userName + '\'), nivel=(\'' + req.body.Nivel + '\') where idusuarios=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    );
});

//******************************************************************************************************//

//**************************************************Permissões Post/Get/Delete/Update*************************************************************/

app.post("/cadpermissao", (req, res)=>{
    let sql = 'insert into permissoes(permissao) values(\'' + req.body.permissao + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any)=>{
            res.send({
                isvalid: true,
                permissao: req.body.permissao
            });
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    );
});

app.get("/getpermissao", (req, res) =>{
    let sql = 'select * from permissoes';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    );
});

app.get("/pegapermission/:id", (req, res)=>{
    let sql = 'select * from permissoes where idpermissoes=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    );
});

app.delete("/delpermissao/:id", (req, res)=>{
    let sql = 'delete from permissoes where permissoes.idpermissoes=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    );
});

app.put("/uppermission/:id", (req, res)=>{
    let sql = 'update permissoes set permissao=(\'' + req.body.permissao + '\') where idpermissoes=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    );
});

//*************************************************Ordens Post/Get/Update****************************************//

app.get("/omFechada", (req, res) =>{
    let sql = 'select * from ordemmanutencao where status="Fechada"';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) =>{
            res.send(data);
        },
        (error: any) =>{
            res.status(404).send('Error');
        }
    );
});

app.get("/om", (req, res) => {

    console.log(req.body);
    let sql = 'select * from ordemmanutencao where status="Aberta"';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(405).send('Ferrou');
        }
    );
});

app.put("/mandandooms/:id", (req, res)=>{
    let sql = 'update ordemmanutencao set responsavel=(\'' + req.body.Resp2 + '\'), status="Em Andamento" where idordemmanutencao=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data:any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    );
});

app.post("/criarOm", (req, res) => {

    console.log(req.body);
    let sql = 'insert into ordemmanutencao(cat, assunto, numeronota, descricao, permission, local, setor, equip, sintoma, causa, parada, status, responsavel) values(\'' + req.body.Cat + '\', \'' + req.body.Assunto + '\',\'' + req.body.NumeroNota + '\', \'' + req.body.Descricao + '\', \'' + req.body.Permission + '\', \'' + req.body.Local + '\', \'' + req.body.Setor + '\', \'' + req.body.Equip + '\',\'' + req.body.Sintoma + '\', \'' + req.body.Causa + '\', \'' + req.body.Parada + '\', \'' + req.body.Status + '\', \'' + req.body.Resp + '\' )';
    console.log(sql);
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any) => {
            res.send(data);
        },
        (error: any) => {
            console.log(error);
            res.status(404).send('Ferrou');
        }
    );
});

app.get("/omsF", (req, res) =>{
    let sql = 'select * from ordemmanutencao where status="Em Andamento"';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    )
});

app.get("/pegandoom/:id", (req, res)=>{
    let sql = 'select * from ordemmanutencao where idordemmanutencao=(\'' + req.params.id + '\')';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data:any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    )
});
app.get("/usersm", (req, res) =>{
    let sql = 'select * from usuarios where nivel="Manutentor"';
    new MySQLFactory().getConnection().select(sql).subscribe(
        (data: any)=>{
            res.send(data);
        },
        (error: any)=>{
            res.status(404).send("Error");
        }
    );
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});