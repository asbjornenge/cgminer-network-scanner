const rpc = require('miner-rpc')

module.exports = async function(method, ip, port) {
  let promise = await new Promise((resolve, reject) => {
    let client = rpc.client(ip, port)
    client.get(method, function(err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  }).catch(err => {throw err})
  return promise
}
