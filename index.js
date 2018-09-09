const minimist = require('minimist')
const tryport  = require('is-port-reachable')
const cgminer  = require('cgminer-api')
const { scan } = require('./scanner')

const argv = minimist(process.argv.slice(2), {
  default: {
    cgminer_port: process.env['CGMINER_PORT'] || 4028,
    interface: process.env['SCAN_INTERFACE'] || 'en0',
    timeout: 3000
  }
})

async function main() {
  let devices = await scan(argv)
  console.log(devices)
}
main()
//  let miners = []
//  for (let device of devices) {
//    let open = await tryport(argv.cgminer_port, { host: device.ip })
//    if (!open) continue;
//    let cgc = new cgminer.client({
//      host: device.ip,
//      port: argv.cgminer_port
//    })
//    await cgc.connect()
//    let config = await cgc.config()
//    miners.push({
//      ip: device.ip,
//      type: config.length > 0 ? config[0]['Device Code'] : 'unknown'
//    })
//  }
//  for (let miner of miners) {
//    // TODO: Update rainbow DNS API (use ky)
//  }
//  console.log(miners)
//})()
