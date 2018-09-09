const { spawn, exec } = require('child_process')
const isIp = require('is-ip')

module.exports.scan = async function(args) {
  let promise = await new Promise((resolve, reject) => {
    let devices = []
    let alive = true
    // TODO: mac / linux  = gstdbuf / stdbuf
    let proc = spawn('gstdbuf', [
      '-i0','-o0','-e0', 
      'arp-scan', '-I', args.interface, '-l', '-q'
    ])
    proc.stdout.on('data', (data) => {
      data.toString().split('\n').forEach(line => {
        let l = line.split('\t')
        if (isIp(l[0])) devices.push(l[0])
      })
    })
    proc.on('close', (code) => {
      let alive = false
      console.log(`child process exited with code ${code}`)
    })
    setTimeout(() => {
      if (alive) proc.kill('SIGINT')
    }, args.timeout)
    setTimeout(() => {
      resolve(devices)
    }, args.timeout+1000)
  }).catch(err => {throw err})
  return promise
}
