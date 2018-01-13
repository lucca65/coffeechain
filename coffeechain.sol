pragma solidity ^0.4.19;

contract Coffeechain {
  address public owner;
  uint256 public fee;

  event OnCoffeeBought();

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function Coffeechain(uint256 _fee) public {
    owner = msg.sender;
    fee = (_fee * 1 finney);
  }

  function buy() public payable {
    require(msg.value == fee);
    OnCoffeeBought();
  }

  function setFee(uint256 _fee) public onlyOwner {
    fee = (_fee * 1 finney);
  }
  function withdraw(address addr) public onlyOwner {
    addr.transfer(this.balance);
  }

  function kill() public onlyOwner {
    selfdestruct(owner);
  }
}
