contract('Token', function(accounts) {
  it("should have token in the first account", function() {
    var token = Token.deployed();

    return token.balanceOf.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "token in account");
    });
  });
});
