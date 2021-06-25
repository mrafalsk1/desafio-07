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
          'create table if not exists itens(it_id biginteger primary key unique, descricao text,us_instalar double,us_retirar double,us_substituir double);'
        );
        tx.executeSql(
          "create table if not exists quantidades(qt_id biginteger primary key not null, equipe_id biginteger not null, quantidade_retirada integer default 0,quantidade_instalada integer default 0,quantidade_substituida integer default 0, item_id biginteger not null, FOREIGN KEY(item_id) REFERENCES itens(it_id) ON DELETE CASCADE);"
        );
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    );
  })
}
export async function getItens(equipeId) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('select q.*,i.* from quantidades q inner join itens i on q.item_id = i.it_id where q.equipe_id = ? order by i.descricao', [equipeId], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => reject(e)
    );
  })
}
export async function saveItens(data) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        data.itens.forEach(it => {
          tx.executeSql('select * from quantidades where item_id = ?', [it._id], (_, { rows }) => {
            if (!rows.item(0)) {
              tx.executeSql('insert into itens(it_id, descricao, us_instalar, us_retirar, us_substituir) values (?, ?, ?, ?, ?)', [it._id, it.descricao, it.us_instalar, it.us_retirar, it.us_substituir])
              tx.executeSql('insert into quantidades(qt_id,item_id, equipe_id) values (?, ?, ?)', [uuid.v4(), it._id, data.equipeId])
            }
            else {
              tx.executeSql('update itens set descricao = ? where it_id = ?', [it.descricao, it._id])
              tx.executeSql('select * from quantidades where item_id = ? and equipe_id = ?', [it._id, data.equipeId], (_, { rows }) => {
                if (!rows.item(0)) {
                  tx.executeSql('insert into quantidades(qt_id,item_id, equipe_id) values (?,?,?)', [uuid.v4(), it._id, data.equipeId])
                }
              })

            }
          }, reject)
        })
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    );
  })
}
export async function resetQuantidades(equipeId) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('update quantidades set quantidade_retirada = ?, quantidade_substituida = ?, quantidade_instalada = ? where equipe_id  = ?', [0, 0, 0, equipeId],)
      },
      (e) => reject(e),
      resolve(true)
    );
  })
}
export async function setQuantidades(item, equipeId) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('update quantidades set quantidade_retirada = ?, quantidade_substituida = ?, quantidade_instalada= ? where item_id= ? and equipe_id = ?', [item.quantidadeRetirada, item.quantidadeSubstituida, item.quantidadeInstalada, item.item_id, equipeId])
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