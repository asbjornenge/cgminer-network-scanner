# cgminer-network-scanner

This module will;

* Scan you local network using `arp-scan`
* Check if specified `cgminer-port` is open
* Try to use the `cgminer-api` to query the miner type
* Return a list of miners with ip address and type

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
