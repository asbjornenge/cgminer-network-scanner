const minimist = require('minimist')
const cns = require('./index')

const args = minimist(process.argv.slice(2), {
  default: {
    cgminer_port: process.env['CGMINER_PORT'] || 4028,
    interface: process.env['SCAN_INTERFACE'] || 'en0',
    timeout: 3000
  }
})

async function main() {
  let miners = await cns(args)
  console.log(JSON.stringify(miners, null, 2))
}

main()
