contract Token {

  uint256 supply;
  string public name;
  address issuer;
  mapping (address => uint256) balances;
  mapping (address => mapping (address => uint256)) allowed;

  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  function Token(uint256 _totalSupply, string _tokenName) {
    supply = _totalSupply;
    name = _tokenName;
    issuer = msg.sender;
    balances[issuer] = _totalSupply;
  }

  function balanceOf(address _owner) constant returns (uint256 balance) {
    return balances[_owner];
  }

  function totalSupply() constant returns (uint256 supply){
    return supply;
  }


  function transfer(address _to, uint256 _value) returns (bool success) {
    if (balances[msg.sender] >= _value && _value > 0) {
       balances[msg.sender] -= _value;
       balances[_to] += _value;
       Transfer(msg.sender, _to, _value);
       return true;
     } else {
       return false;
     }
  }

  function transferFrom(address _from, address _to, uint256 _value) returns (bool success){
    if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
        balances[_to] += _value;
        balances[_from] -= _value;
        allowed[_from][msg.sender] -= _value;
        Transfer(_from, _to, _value);
        return true;
    } else {
      return false;
    }
  }

  function approve(address _spender, uint256 _value) returns (bool success){
    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    return true;
  }

  function allowance(address _owner, address _spender) constant returns (uint256 remaining){
    return allowed[_owner][_spender];
  }
}
