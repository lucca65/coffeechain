console.log('Init firmware of CoffeeChain')
const Web3 = require('web3')

const provider = 'http://localhost:8545'
const contract = {
  address: '0x9f51bAbaa93F58A27FDabe5F4a77089C78aa21cf',
  abi: '[{"constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},{"constant": false, "inputs": [{"name": "addr", "type": "address"}], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},{"constant": false, "inputs": [{"name": "_fee", "type": "uint256"}], "name": "setFee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},{"constant": true, "inputs": [], "name": "owner", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"},{"constant": false, "inputs": [], "name": "buy", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function"},{"constant": true, "inputs": [], "name": "fee", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"},{"inputs": [{"name": "_fee", "type": "uint256"}], "payable": false, "stateMutability": "nonpayable", "type": "constructor"},{"anonymous": false, "inputs": [], "name": "OnCoffeeBought", "type": "event"}]'
}

const web3 = new Web3(new Web3.providers.HttpProvider(provider))

if (web3.isConnected()) {
  console.log('Provider is connected')
}

const CoffeeChain = web3.eth.contract(JSON.parse(contract.abi))
const coffeeChain = CoffeeChain.at(contract.address)

coffeeChain.fee(function (error, fee) {
  if (error) {
    console.log('Get Fee error: ', error)
  } else {
    console.log('Price of coffee is ' + web3.fromWei(fee, 'finney') + ' finney')
  }
})

coffeeChain.OnCoffeeBought().watch(function (error, result) {
  if (error) {
    console.log('On Coffee Bought error:', error)
  } else {
    console.log('Make a coffee')
  }
})
console.log('Start watch event OnCoffeeBought')

// Start reading from stdin so we don't exit.
process.stdin.resume()
