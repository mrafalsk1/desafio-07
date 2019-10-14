import * as SQLite from 'expo-sqlite';

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
        tx.executeSql('drop table if exists tempos')
        tx.executeSql('drop table if exists itens_ponto')
        tx.executeSql('drop table if exists pontos')
        tx.executeSql('drop table if exists notas')
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    );
  })
}

export async function prepareDB() {
  // await this.dropTables()
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql(
          'create table if not exists itens (id biginteger primary key not null, descricao text);'
        );

        tx.executeSql(
          'create table if not exists notas (ag_id biginteger primary key, nota_id biginteger not null, data_ag datetime, manha tinyint, tarde tinyint);'
        );

        tx.executeSql(
          'create table if not exists pontos (ap_id biginteger primary key not null, ponto_id biginteger not null, nota_id biginteger not null, descricao text not null, ag_id biginteger not null, FOREIGN KEY(ag_id) REFERENCES notas(ag_id) ON DELETE CASCADE);'
        );

        tx.executeSql(
          'create table if not exists itens_ponto (id biginteger not null, ponto_id biginteger not null, ap_id biginteger not null, descricao text not null, qt double, operacao text, qtr double, realizado tinyint default 0, PRIMARY KEY(id, ap_id), FOREIGN KEY(ap_id) REFERENCES pontos(ap_id) ON DELETE CASCADE);'
        );

        tx.executeSql(
          "create table if not exists tempos (id biginteger primary key not null, inicio datetime DEFAULT (datetime('now','localtime')) not null, fim datetime, ap_id biginteger not null, FOREIGN KEY(ap_id) REFERENCES pontos(ap_id) ON DELETE CASCADE);"
        );
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    );
  })
}

export async function saveNotas(notas) {
  // console.log(notas)
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('delete from notas');
        notas.forEach(n => {
          tx.executeSql('insert into notas (ag_id, nota_id, data_ag, manha, tarde) values (?, ?, ?, ?, ?)', [n.ag_id, n.nota, n.data_ag, n.manha ? 1 : 0, n.tarde ? 1 : 0]);

          n.pontos.forEach(p => {
            tx.executeSql('insert into pontos (ap_id, ponto_id, descricao, nota_id, ag_id) values (?, ?, ?, ?, ?)', [p.ap_id, p.id, p.ponto, n.nota, n.ag_id]);

            p.itens.forEach(i => {
              tx.executeSql('insert into itens_ponto (id, ponto_id, ap_id, descricao, qt, operacao) values (?, ?, ?, ?, ?, ?)', [i.id, p.id, i.ap_id, i.item, i.qt, i.operacao]);
            });
          });
        });
      },
      (e) => { reject(e) },
      () => { resolve(true) }
    );
  })
}

export async function getNotas(turno) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('select * from notas where '
          + (turno == 'am' ? 'manha=1' : 'tarde=1')
          + ' order by manha desc, tarde desc', [], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => { reject(e) }
    );
  })
}

export async function getPontos(agId) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('select distinct p.*, (select t.id from tempos t where t.ap_id = p.ap_id and t.fim is null) as tempo_id from pontos p'
          + ' where p.ag_id = ? and p.ap_id in (select ap_id from itens_ponto) order by p.descricao', [agId], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => { reject(e) }
    );
  })
}

export async function getItensPonto(apId) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('select * from itens_ponto where ap_id = ? order by descricao', [apId], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => { reject(e) }
    );
  })
}

export async function setItemRealizado(item) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('update itens_ponto set realizado = ?, qtr = ? where id = ? and ap_id = ?', [item.realizado, item.qtr, item.id, item.ap_id])
      },
      (e) => reject(e),
      resolve(true)
    );
  })
}

export async function addItemRealizado(item) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("insert into itens_ponto (id, ponto_id, ap_id, descricao, qtr, realizado, qt, operacao) values (?, ?, ?, ?, ?, ?, ?, ?)",
          [item.id, item.ponto_id, item.ap_id, item.descricao, item.qtr, item.realizado, item.qt, item.operacao]);
      },
      (e) => { reject(e) },
      resolve(true)
    );
  })
}

export async function startTempo(apId) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('select coalesce(max(id), 0) as max from tempos', [], (_, { rows }) => {
          const nextId = rows.item(0).max + 1
          tx.executeSql('insert into tempos (id, ap_id) values (?, ?)', [nextId, apId], (_, { rows }) => resolve(nextId))
        })
      },
      (e) => reject(e)
    );
  })
}

export async function fechaTempo(tempoId) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("update tempos set fim = (datetime('now','localtime')) where id = ?", [tempoId])

        tx.executeSql('select * from tempos where id = ?', [tempoId], (_, { rows }) => resolve(rows.item(0)), reject)
      },
      (e) => reject(e)
    );
  })
}

export async function hasTemposAbertos() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("select count(id) as qt from tempos where fim is null", [], (_, { rows }) => resolve(rows.item(0).qt > 0), reject)
      },
      (e) => reject(e)
    );
  })
}

export async function getTempos() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("update tempos set fim = (datetime('now','localtime')) where fim is null", [])
        tx.executeSql("select inicio, fim, ap_id as agendamento_ponto_id from tempos order by ap_id", [], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => reject(e)
    );
  })
}

export async function clearTempos() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("delete from tempos", [])
      },
      (e) => reject(e),
      resolve(true)
    );
  })
}

export async function getItensRealizados() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("select id as item_unc_id, ap_id as agendamento_ponto_id, qtr as qt from itens_ponto where realizado==1 order by ap_id", [], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => reject(e)
    );
  })
}

export async function deleteRealizados() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("delete from itens_ponto where realizado==1", [])
      },
      (e) => reject(e),
      resolve(true)
    );
  })
}

export async function saveItensUnc(itens) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('delete from itens');

        itens.forEach(it => {
          tx.executeSql('insert into itens (id, descricao) values (?, ?)', [it.id, it.descricao]);
        });
      },
      (e) => reject(e),
      () => { resolve(true) }
    );
  })
}

export async function buscaItens(termo) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql("select id, id || '' as key, descricao from itens where descricao like ? order by descricao limit 100", ['%' + termo + '%'], (_, { rows }) => resolve(rows._array), reject)
      },
      (e) => reject(e)
    );
  })
}

export async function checkItem(itemId, apId) {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('select coalesce(count(id), 0) as qt from itens_ponto where id = ? and ap_id = ?', [itemId, apId], (_, { rows }) => {
          resolve(rows.item(0).qt > 0)
        })
      },
      (e) => reject(e)
    );
  })
}

export async function hasItensSinc() {
  return new Promise((resolve, reject) => {
    getDB().transaction(
      tx => {
        tx.executeSql('select sum(qt) as qt from ('
          + '  select count(id) as qt from tempos'
          + '  union'
          + '  select count(id) as qt from itens_ponto where realizado==1'
          + ') s', [], (_, { rows }) => resolve(rows.item(0).qt > 0), reject)
      },
      (e) => reject(e)
    );
  })
}

export { };