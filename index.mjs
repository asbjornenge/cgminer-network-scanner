import scanner from 'local-network-scanner'
import tryport from 'is-port-reachable'
import cgminer from 'cgminer-api'
import minimist from 'minimist'

var argv = minimist(process.argv.slice(2), {
  default: {
    cgminer_port: process.env['CGMINER_PORT'] || 4028,
    interface: process.env['SCAN_INTERFACE'] || 'en0'
  }
})

async function scan() {
  let promise = await new Promise((resolve, reject) => {
    scanner.scan({arguments: ["-I", argv.interface]}, devices => {
      resolve(devices)
    })
  }).catch(err => {throw err})
  return promise
}

(async function() {
  let devices = await scan()
  let miners = []
  for (let device of devices) {
    let open = await tryport(argv.cgminer_port, { host: device.ip })
    if (!open) continue;
    let cgc = new cgminer.client({
      host: device.ip,
      port: argv.cgminer_port
    })
    await cgc.connect()
    let config = await cgc.config()
    miners.push({
      ip: device.ip,
      type: config.length > 0 ? config[0]['Device Code'] : 'unknown'
    })
  }
  for (let miner of miners) {
    // TODO: Update rainbow DNS API (use ky)
  }
  console.log(miners)
})()
