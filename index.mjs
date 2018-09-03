import scanner from 'local-network-scanner'

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
  console.log(devices)
})()
