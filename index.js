const minimist = require('minimist')
const tryport  = require('is-port-reachable')
const { scan } = require('./scanner')
const cgminer  = require('./cgminer')

const args = minimist(process.argv.slice(2), {
  default: {
    cgminer_port: process.env['CGMINER_PORT'] || 4028,
    interface: process.env['SCAN_INTERFACE'] || 'en0',
    timeout: 3000
  }
})

async function main() {
  let ips = await scan(args)
  let miners = []
  for (let ip of ips) {
    let open = await tryport(args.cgminer_port, { host: ip })
    if (!open) continue
    let config = await cgminer.config(ip, args.cgminer_port)
    miners.push({
      ip: ip,
      type: config['Device Code']
    })
  }
  console.log(miners)
}
main()
