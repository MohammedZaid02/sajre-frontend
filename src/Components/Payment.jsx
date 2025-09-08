import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Smartphone, Wallet, Building2, Shield, Lock, Check, ChevronDown } from 'lucide-react';
import { api } from '../Utils/api';
// import { api } from '../Utils/api';

const PaymentGateway = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const paymentMethods = [
    { id: 'card', label: 'Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'netbanking', label: 'Net Banking', icon: Building2 }
  ];

  const wallets = [
    { id: 'paytm', name: 'Paytm', logo: '💳' },
    { id: 'phonepe', name: 'PhonePe', logo: '📱' },
    { id: 'googlepay', name: 'Google Pay', logo: '🔵' },
    { id: 'amazonpay', name: 'Amazon Pay', logo: '🟠' }
  ];

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 
    'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda'
  ];

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matched = cleaned.match(/\d{1,4}/g);
    const match = matched && matched.join(' ');
    if (match && match.length < 20) {
      setCardNumber(match);
    }
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      const formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
      setExpiryDate(formatted);
    } else {
      setExpiryDate(cleaned);
    }
  };

  const validatePayment = () => {
    setErrorMessage('');
    
    switch (selectedMethod) {
      case 'card':
        if (!cardNumber.trim()) return 'Please enter card number';
        if (!expiryDate.trim()) return 'Please enter expiry date';
        if (!cvv.trim()) return 'Please enter CVV';
        if (!cardHolder.trim()) return 'Please enter cardholder name';
        break;
      
      case 'upi':
        if (!upiId.trim()) return 'Please enter UPI ID';
        break;
      
      case 'wallet':
        if (!selectedWallet) return 'Please select a wallet';
        break;
      
      case 'netbanking':
        if (!selectedBank) return 'Please select your bank';
        break;
      
      default:
        return 'Please select a payment method';
    }
    
    return null;
  };

  const handlePayment = async () => {
    const validationError = validatePayment();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);

    const paymentData = {
      paymentDetails: {
        paymentMethod: selectedMethod,
        cardNumber: selectedMethod === 'card' ? cardNumber.slice(-4) : undefined,
        cardHolder: selectedMethod === 'card' ? cardHolder : undefined,
        upiId: selectedMethod === 'upi' ? upiId : undefined,
        selectedWallet: selectedMethod === 'wallet' ? selectedWallet : undefined,
        selectedBank: selectedMethod === 'netbanking' ? selectedBank : undefined,
      },
      amount: 6999,
      courseId: '652a7771c81222a07011c111', // Replace with actual courseId
      referralCode: referralCode,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/api/student/dummy-payment', paymentData, token);
      if (response.success) {
        setShowSuccessModal(true);
      } else {
        setErrorMessage(response.message || 'Payment failed.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage(error.message || 'An error occurred during payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden mt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">S</span>
            </div>
            <div>
              <h3 className="font-semibold">Sajre Edutech</h3>
              <p className="text-blue-100 text-sm">Premium </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Secure</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-blue-100 text-sm">Amount to pay</p>
          <p className="text-3xl font-bold">₹6999</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-2 mb-6">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.button
                key={method.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs font-medium">{method.label}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Payment Forms */}
        <AnimatePresence mode="wait">
          {selectedMethod === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => formatCardNumber(e.target.value)}
                  maxLength={19}
                  className="w-full px-3 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => formatExpiryDate(e.target.value)}
                    maxLength={5}
                    className="w-full px-3 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    maxLength={4}
                    className="w-full px-3 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  id="cardHolder"
                  type="text"
                  placeholder="John Doe"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </motion.div>
          )}

          {selectedMethod === 'upi' && (
            <motion.div
              key="upi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  id="upiId"
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {['paytm', 'phonepe', 'googlepay', 'bhim'].map((app) => (
                  <motion.button
                    key={app}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 border border-border rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="text-2xl mb-1">
                      {app === 'paytm' && '💙'}
                      {app === 'phonepe' && '💜'}
                      {app === 'googlepay' && '🔵'}
                      {app === 'bhim' && '🟢'}
                    </div>
                    <p className="text-xs font-medium capitalize">{app}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {selectedMethod === 'wallet' && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {wallets.map((wallet) => (
                <motion.button
                  key={wallet.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedWallet(wallet.id)}
                  className={`w-full p-4 border rounded-lg transition-colors flex items-center space-x-3 ${
                    selectedWallet === wallet.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-border hover:border-blue-300'
                  }`}
                >
                  <span className="text-2xl">{wallet.logo}</span>
                  <span className="font-medium">{wallet.name}</span>
                  {selectedWallet === wallet.id && (
                    <Check className="w-4 h-4 text-blue-600 ml-auto" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}

          {selectedMethod === 'netbanking' && (
            <motion.div
              key="netbanking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Your Bank
                </label>
                <button
                  onClick={() => setShowBankDropdown(!showBankDropdown)}
                  className="w-full px-3 py-3 bg-input-background border border-border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between"
                >
                  <span className={selectedBank ? 'text-gray-900' : 'text-gray-500'}>
                    {selectedBank || 'Choose your bank'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showBankDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showBankDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto"
                  >
                    {banks.map((bank) => (
                      <button
                        key={bank}
                        onClick={() => {
                          setSelectedBank(bank);
                          setShowBankDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {bank}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Referral Code Input */}
        <div className="mt-4">
          <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-1">
            Referral Code (Optional)
          </label>
          <input
            id="referralCode"
            type="text"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="w-full px-3 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
          </motion.div>
        )}

        {/* Separator */}
        <div className="my-6">
          <div className="border-t border-border"></div>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex items-center space-x-1 text-green-600">
            <Lock className="w-4 h-4" />
            <span className="text-xs">256-bit SSL</span>
          </div>
          <div className="flex items-center space-x-1 text-green-600">
            <Shield className="w-4 h-4" />
            <span className="text-xs">PCI DSS</span>
          </div>
          <div className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
            <span className="text-xs font-medium">100% Safe</span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Pay ₹6999</span>
            </>
          )}
        </button>

        {/* Footer */}
        <div className="flex items-center justify-center mt-4 space-x-2 text-muted-foreground">
          <span className="text-xs">Powered by</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="text-xs font-semibold text-blue-600">Razorpay</span>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full mx-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-green-600" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-semibold text-gray-900 mb-2"
                >
                  Payment Successful!
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-6"
                >
                  Your payment of ₹7000 has been processed successfully.
                </motion.p>
                
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentGateway;