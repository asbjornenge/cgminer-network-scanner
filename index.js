const tryport  = require('is-port-reachable')
const { scan } = require('./scanner')
const cgminer  = require('./cgminer')

module.exports = async function(args) {
  let ips = await scan(args)
  let miners = []
  for (let ip of ips) {
    let open = await tryport(args.cgminer_port, { host: ip })
    if (!open) continue
    let config = await cgminer.config(ip, args.cgminer_port)
    miners.push({
      ip: ip,
      type: config['Device Code'].trim()
    })
  }
  return miners
}
