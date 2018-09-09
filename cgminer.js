const rpc = require('miner-rpc')

module.exports.config = async function(ip, port) {
  let promise = await new Promise((resolve, reject) => {
    let client = rpc.client(ip, port)
    client.get('config', function(err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  }).catch(err => {throw err})
  return promise
}
