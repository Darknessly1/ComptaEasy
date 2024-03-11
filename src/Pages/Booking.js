import React, { useState, useEffect } from 'react';

const Booking = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    id: '',
    name: '',
    type: '',
    date: '',
    amount: '',
    currency: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Load accounts from local storage on component mount
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    setAccounts(storedAccounts);
  }, []);

  useEffect(() => {
    // Save accounts to local storage whenever they change
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
  };

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.type || !newAccount.date || !newAccount.amount || !newAccount.currency) {
      alert('Please enter all required fields for the account.');
      return;
    }

    if (editIndex !== null) {
      // If editing, replace the existing account
      const updatedAccounts = [...accounts];
      updatedAccounts[editIndex] = newAccount;
      setAccounts(updatedAccounts);
      setEditIndex(null);
    } else {
      // If adding, push a new account
      setAccounts((prevAccounts) => [...prevAccounts, { ...newAccount, id: Date.now().toString() }]);
    }

    // Reset the form
    setNewAccount({
      id: '',
      name: '',
      type: '',
      date: '',
      amount: '',
      currency: '',
    });
  };

  const handleEditAccount = (index) => {
    const accountToEdit = accounts[index];
    setNewAccount(accountToEdit);
    setEditIndex(index);
  };

  const handleRemoveAccount = (index) => {
    const updatedAccounts = [...accounts];
    updatedAccounts.splice(index, 1);
    setAccounts(updatedAccounts);
  };

  const calculateTotal = () => {
    const total = accounts.reduce((acc, account) => acc + parseFloat(account.amount), 0);
    return total.toFixed(2);
  };

  return (
    <div className="p-5 bg-gray-900/50 m-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Chart of Accounts</h1>

      <div className="flex flex-wrap -mx-4 mb-4">
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <label className="block text-white text-sm font-bold mb-2">Account Name</label>
          <input
            type="text"
            name="name"
            value={newAccount.name}
            onChange={handleInputChange}
            className="w-full bg-white border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <label className="block text-white text-sm font-bold mb-2">Account Type</label>
          <input
            type="text"
            name="type"
            value={newAccount.type}
            onChange={handleInputChange}
            className="w-full bg-white border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <label className="block text-white text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={newAccount.date}
            onChange={handleInputChange}
            className="w-full bg-white border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <label className="block text-white text-sm font-bold mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={newAccount.amount}
            onChange={handleInputChange}
            className="w-full bg-white border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
          <label className="block text-white text-sm font-bold mb-2">Currency</label>
          <select
            name="currency"
            value={newAccount.currency}
            onChange={handleInputChange}
            className="w-full bg-white border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="MAD">MAD</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleAddAccount}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        {editIndex !== null ? 'Edit Account' : 'Add Account'}
      </button>

      <table className="w-full mt-8 bg-gray-900/50 border-black">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 border-b">ID</th>
            <th className="text-left py-2 px-4 border-b">Name</th>
            <th className="text-left py-2 px-4 border-b">Type</th>
            <th className="text-left py-2 px-4 border-b">Date</th>
            <th className="text-left py-2 px-4 border-b">Amount</th>
            <th className="text-left py-2 px-4 border-b">Currency</th>
            <th className="text-left py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={account.id}>
              <td className="py-2 px-4 border-b">{account.id}</td>
              <td className="py-2 px-4 border-b">{account.name}</td>
              <td className="py-2 px-4 border-b">{account.type}</td>
              <td className="py-2 px-4 border-b">{account.date}</td>
              <td className="py-2 px-4 border-b">{account.amount}</td>
              <td className="py-2 px-4 border-b">{account.currency}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditAccount(index)}
                  className="bg-green-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveAccount(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <strong>Total Amount:</strong> {calculateTotal()} {newAccount.currency}
      </div>
    </div>
  );
};

export default Booking;
