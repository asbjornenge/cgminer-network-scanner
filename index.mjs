import scanner from 'local-network-scanner'
import tryport from 'is-port-reachable'
import cgminer from 'cgminer-api'

const CGMINER_PORT = 4028

async function scan() {
  let promise = await new Promise((resolve, reject) => {
    scanner.scan({arguments: ["-I", "en0"]}, devices => {
      resolve(devices)
    })
  }).catch(err => {throw err})
  return promise
}

(async function() {
  let devices = await scan()
  let miners = []
  for (let device of devices) {
    let open = await tryport(CGMINER_PORT, { host: device.ip })
    if (!open) continue;
    let cgc = new cgminer.Client({
      host: device.ip,
      port: CGMINER_PORT
    })
    let config = await cgminer.config()
    miners.push(device.ip, config)
  }
  console.log(miners)
})()
