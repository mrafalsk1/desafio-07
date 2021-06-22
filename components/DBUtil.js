import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';
const DB_NAME = 'procel.db'

export function getDB() {
  const db = SQLite.openDatabase(DB_NAME);
  db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => { });
  return db;
}

export async function dropTables() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('drop table if exists itens')
        tx.executeSql('drop table if exists quantidades')
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    );
  })
}

export async function prepareDB() {
  //await this.dropTables()
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql(
          'create table if not exists itens(it_id biginteger primary key not null, descricao text,us_instalar double,us_retirar double,us_substituir double);'
        );
        tx.executeSql(
          "create table if not exists quantidades(qt_id biginteger primary key not null,quantidade_retirada integer default 0,quantidade_instalada integer default 0,quantidade_substituida integer default 0, item_id biginteger not null, FOREIGN KEY(item_id) REFERENCES itens(it_id) ON DELETE CASCADE);"
        );
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    );
  })
}
export async function getItens() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('select i.*,(select q.quantidade_retirada from quantidades q where i.it_id = q.item_id) as quantidade_retirada,'
          + ' (select q.quantidade_substituida from quantidades q where i.it_id = q.item_id) as quantidade_substituida,'
          + ' (select q.quantidade_instalada from quantidades q where i.it_id = q.item_id) as quantidade_instalada ' + 'from itens i', [], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => reject(e)
    );
  })
}
export async function saveItens(itens) {
  return new Promise((resolve, reject) => {

    getDB().transaction(
      tx => {
        itens.forEach(it => {
          // tx.executeSql('if not exists(select * from itens where it_id = ?) begin insert into itens (it_id, descricao, us_instalar, us_retirar, us_substituir) values '
          //   + '(?, ?, ?, ?, ?)'select * from itens, [it.id,it.id,it.descricao, it.us_instalar, it.us_retirar, it.us_substituir])
          tx.executeSql('insert or ignore into itens(it_id, descricao, us_instalar, us_retirar, us_substituir) values (?, ?, ?, ?, ?)', [it._id, it.descricao, it.us_instalar, it.us_retirar, it.us_substituir])
          tx.executeSql('insert or ignore into quantidades(qt_id,item_id) values (?, ?)', [uuid.v4(), it._id])
        })
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    );
  })
}
export async function saveQuantidades(itens) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        itens.forEach(it => {
          tx.executeSql('insert into quantidades(item_id) value (?)', [it.id])
        })
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    )
  })
}
export async function resetQuantidades() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('update quantidades set quantidade_retirada = ?, quantidade_substituida = ?, quantidade_instalada = ?', [0, 0, 0])
      },
      (e) => reject(e),
      resolve(true)
    );
  })
}
export async function setQuantidades(item) {
  return new Promise((resolve, reject) => {
    console.log('aqui');
    console.log(item);
    getDB().transaction(
      tx => {
        tx.executeSql('update quantidades set quantidade_retirada = ?, quantidade_substituida = ?, quantidade_instalada= ? where item_id= ?', [item.quantidadeRetirada, item.quantidadeSubstituida, item.quantidadeInstalada, item.item_id])
      },
      (e) => reject(e),
      resolve(true)
    );
  })
}
export async function getQuantidades() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("select id, des from itens where categoria like ? order by descricao limit 500", ['%' + termo + '%'], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => reject(e)
    );
  })
}

export { };