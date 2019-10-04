import * as Server from './ServerConfig';
import * as DBUtil from './DBUtil'


export async function sync() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(true)
    }, 5000);
  })
}

export async function receber(equipe) {
  return Server.get('sync/down/' + equipe).then(async (notas) => {
    return DBUtil.saveNotas(notas)
  })
}

export async function enviar(equipe) {
  const realizados = await DBUtil.getItensRealizados()
  const tempos = await DBUtil.getTempos()

  console.log('Tempos: ' + tempos.length)
  console.log(tempos)

  console.log('Realizados: ' + realizados.length)
  console.log(realizados)

  return Server.post('sync/up/' + equipe, { 'itens': realizados, 'tempos': tempos }).then((res) => {
    if (res.status) {
      console.log('OK')
      DBUtil.clearTempos()
      DBUtil.deleteRealizados()
    }
  })
}

export async function itensUnc() {
  return Server.get('sync/itens').then(async (json) => {
    return DBUtil.saveItensUnc(json)
  })
}


export { };