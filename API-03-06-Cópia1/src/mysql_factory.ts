import {MySQL} from './mysql';

export class MySQLFactory {
    constructor(){

    }

    public getConnection() : any{
      return new MySQL('localhost', 'root', '', 'duas_rodas_bd');
    }
}