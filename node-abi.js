const nodeAbi = require('node-abi');

const { devDependencies } = require('./package.json');

const abi = nodeAbi.getAbi(devDependencies.electron, 'electron');
console.log('electron: ', devDependencies.electron, abi);
console.log('', nodeAbi.getTarget(abi, 'electron'));


console.log('node 14.16.0 abi:', nodeAbi.getAbi('14.16.0', 'node'));
// console.log(nodeAbi.getTarget('83', 'node'));
console.log(nodeAbi.getTarget('89', 'electron'));
console.log(nodeAbi.getTarget('83', 'node'));
console.log(nodeAbi.getTarget('85', 'electron'));
// console.log()
