// 此代码示例连接到以太坊主网，获取指定账户的余额，并发送以太坊交易。可以根据自己的需求进行修改和扩展。
// 引入 Web3 库 
const Web3 = require('web3');

// 创建一个新的 Web3 实例
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// 获取以太坊账户余额
async function getBalance(address) {
  try {
    const balance = await web3.eth.getBalance(address);
    console.log(`账户 ${address} 的余额为: ${web3.utils.fromWei(balance, 'ether')} ETH`);
  } catch (error) {
    console.error('获取余额时出错:', error);
  }
}

// 发送以太坊交易
async function sendTransaction(from, to, value) {
  try {
    const accounts = await web3.eth.getAccounts();
    const gasPrice = await web3.eth.getGasPrice();
    const txCount = await web3.eth.getTransactionCount(from);

    const txObject = {
      from: from,
      to: to,
      value: web3.utils.toWei(value.toString(), 'ether'),
      gasPrice: gasPrice,
      nonce: txCount,
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObject, 'YOUR_PRIVATE_KEY');
    const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('交易成功，交易哈希:', txReceipt.transactionHash);
  } catch (error) {
    console.error('发送交易时出错:', error);
  }
}

// 示例用法
const address = '0x1234567890'; // 以太坊账户地址
getBalance(address); // 获取账户余额

const from = '0xabcdef123456'; // 发送方账户地址
const to = '0x9876543210'; // 接收方账户地址
const value = 0.1; // 以太坊数量
sendTransaction(from, to, value); // 发送以太坊交易
