# cgminer-network-scanner

This module will scan you local network using `arp-scan`, check if specified `cgminer-port` is open and tries to get use the `cgminer-api` ot query the miner type. It return a list of miners with ip address and type.

## Install

```
apt install arp-scan
npm install --save cgminer-network-scanner
```

## Use

```
const cns = require('cgminer-network-scanner')

let miners = cns({
  cgminer_port: 4028,
  interface: 'en0'
})

console.log(miners)

--

[
  {
    "ip": "10.30.0.62",
    "type": "DT1"
  },
  {
    "ip": "10.30.0.63",
    "type": "DT1"
  }
]
```

## Changelog

### 1.0.0

* Initial release :tada: 
