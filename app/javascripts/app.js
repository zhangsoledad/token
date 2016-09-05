var issuer;
var transfer_to;
var tx_adrees;
var token;

function setStatus(id, message) {
  var status = document.getElementById(id);
  status.innerHTML = message;
};

function queryBalance() {
  var query_adress = document.getElementById("query_adress").value;
  token.balanceOf.call(query_adress, {from: query_adress}).then(function(value) {
    var balance_element = document.getElementById("balance");
    console.log(value.valueOf());
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
  });
};

function transferToken() {
  if (!tx_adrees) {
    alert("Deploy first");
    return;
  } else {
    var transfer_to = document.getElementById("transfer_to").value;
    var transfer_from = document.getElementById("transfer_from").value;
    var amount = parseInt(document.getElementById("amount").value);
    token.transfer(transfer_to, amount, {from: transfer_from}).then(function(value) {
      setStatus("transfer-status", "transfer success:" + amount);
    }).catch(function(err) {
      console.log("ERROR! " + err.message);
    });
  }
};

function deployToken() {
  issuer = document.getElementById("issuer").value;
  var supply = parseInt(document.getElementById("supply").value);
  var name = document.getElementById("name").value;
  var contract = web3.eth.contract(Token.abi);
  var code = Token.unlinked_binary;
  var gas = web3.eth.estimateGas({
    from: issuer,
    data: code
  });
  console.log(gas);
  contract.new(supply, name, {
    data: code,
    gas: gas * 1.5, //estimateGas has problem
    from: issuer},
    function(err, myContract){
      if(!err) {
        if(!myContract.address) {
          console.log(myContract.transactionHash)
        } else {
          console.log(myContract.address)
          tx_adrees = myContract.address;
          token = Token.at(tx_adrees);
          setStatus("deploy-status", "Contract deployed adress:" + tx_adrees);
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
  });

}
