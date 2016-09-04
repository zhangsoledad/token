var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance(address) {
  var token = Token.at(address);
  token.balanceOf.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    console.log(value.valueOf());
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function deployToken() {
  var supply = parseInt(document.getElementById("supply").value);
  var name = document.getElementById("name").value;
  var contract = web3.eth.contract(Token.abi);
  var code = Token.unlinked_binary;
  var gas = web3.eth.estimateGas({
    from: account,
    data: code
  });
  console.log(gas);
  contract.new(supply, name, {
    data: code,
    gas: 1000000, //estimateGas has problem
    from: account},
    function(err, myContract){
      if(!err) {
        if(!myContract.address) {
          console.log(myContract.transactionHash)
        } else {
          console.log(myContract.address)
          refreshBalance(myContract.address);
        }
      } else {
        console.log(err);
      }
    }
  );
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    accounts = accs;
    account = accounts[0];
  });

}
