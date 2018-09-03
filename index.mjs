const scanner = require('local-network-scanner');
scanner.scan({arguments: ["-I", "en0"]}, devices => {
    console.log(devices);
});
