const tryport  = require('is-port-reachable')
const { scan } = require('./scanner')
const cgminer  = require('./cgminer')

module.exports = async function(args) {
  let ips = await scan(args)
  let miners = []
  for (let ip of ips) {
    let open = await tryport(args.cgminer_port, { host: ip })
    if (!open) continue
    if (miners.map(m => m.ip).indexOf(ip) >= 0) continue
    let config={},version={},type='unknown'
    try {
      config = await cgminer('config', ip, args.cgminer_port)
    }
    catch(e) {}
    try {
      version = await cgminer('version', ip, args.cgminer_port)
    }
    catch(e) {}
    let devcode = config['Device Code']
    let vertype = version['Type']
    if (devcode && devcode != '') type = devcode.trim()
    else if (vertype && vertype != '') type = vertype.trim()
    miners.push({
      ip: ip,
      type: type 
    })
  }
  return miners
}
