function buildContract () {
  const address = '0xc5381302e07944c75e8a27f28Fab84300f49FE61'
  const abi = '[{"constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "addr", "type": "address"}], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "counter", "outputs": [{"name": "", "type": "int256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [{"name": "_fee", "type": "uint256"}], "name": "setFee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "owner", "outputs": [{"name": "", "type": "address"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": false, "inputs": [], "name": "buy", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function"}, {"constant": true, "inputs": [], "name": "fee", "outputs": [{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, {"inputs": [{"name": "_fee", "type": "uint256"}], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [], "name": "OnCoffeeBought", "type": "event"}]'
  const abiJson = JSON.parse(abi)
  window.contract = web3.eth.contract(abiJson).at(address)

  contract.OnCoffeeBought(function (error, coffee) {
    alert('coffee bought: ' + coffee)
    document.getElementById('counter').innerText++
  })

  contract.counter(function (error, counter) {
    document.getElementById('counter').innerText = counter
  })

  contract.fee(function (error, fee) {
    let value = web3.fromWei(fee, 'ether')
    document.getElementById('fee').innerText = value
    window.fee = value
  })
}
