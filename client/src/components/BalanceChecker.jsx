import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const CheckBalance = (props) => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const checkBalance = async () => {
    try {
      // Connect to the Ethereum network (using the default provider)
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the balance of the address
      const balance = await provider.getBalance(props.walletAddress);

      // Convert the balance from Wei to Ether
      const balanceInEther = ethers.formatEther(balance);

      // Set the balance in state
      setBalance(balanceInEther);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch balance. Please check the address or Metamask and try again.');
    }
  };

  useEffect(() => {
    if(props.walletAddress) {
      checkBalance()
    }
  }, [props.walletAddress])
  

  return (
    <div className="container mt-5">
      <h2>List user Ethereum balance</h2>

      {balance !== null && (
        <div className="alert alert-info mt-3">
          <strong>Balance:</strong> {balance} ETH
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
    </div>
  );
};

export default CheckBalance;
