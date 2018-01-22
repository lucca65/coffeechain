window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  buildContract()

  if (!web3.isConnected()) {
    console.error('Can\'t connect to the blockchain')
    $('#no-web3-modal').modal('show')
    return
  }

  // verifica o endereço escolhido
  setInterval(function () {
    const currentAddress = document.getElementById('address').innerText
    if (web3.eth.accounts[0] !== currentAddress) {
      console.log(web3.eth.accounts[0])
      document.getElementById('address').innerText = web3.eth.accounts[0]
    }
  }, 1000)
})

// Comprar Café
$('#buy').on('click', function () {
  if (typeof window.web3 === 'undefined' || !window.web3.isConnected()) {
    $('#no-web3-modal').modal('show')
  }

  contract.fee(function (error, fee) {
    if (error) {
      alert('cant fetch fee')
      return
    }

    contract.buy({
      value: fee,
      from: web3.eth.accounts[0]
    }, function (error, result) {
      if (error) {
        console.error(error)
        return
      }
      $('#coffee-bought-modal').modal('show')
      document.getElementById('counter').innerText++
    })
  })

})

// Tip Button
document.querySelector('#tip').addEventListener('click', function() {
  if (typeof window.web3 === 'undefined' || !window.web3.isConnected()) {
    $('#no-web3-modal').modal('show')
  }

  var user_address = web3.eth.accounts[0]
  web3.eth.sendTransaction({
    to: '0x00Df8e77d5fA0630144e147cCDB0B504F9C05A8D',
    from: user_address,
    value: web3.toWei('1', 'finney')
  }, function (err, transactionHash) {
    if (err) return alert('Oh no! Sorry to see you go ): ' + err.message)

    // If you get a transactionHash, you can assume it was sent,
    // or if you want to guarantee it was received, you can poll
    // for that transaction to be mined first.
    $('#thanks-modal').modal('show')
  })
})
