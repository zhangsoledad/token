module.exports = function(deployer) {
  deployer.deploy(Token, 10000, "hahah");
  deployer.autolink();
};
