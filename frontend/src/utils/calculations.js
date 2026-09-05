// export const calculateIPO = (buyPrice, sellPrice, shares) => {
//   const investment = buyPrice * shares;
//   const profit = (sellPrice - buyPrice) * shares;
//   const halfProfit = profit / 2;
//   const profitPercentage = investment > 0 ? (profit / investment) * 100 : 0;

//   return {
//     investment,
//     profit,
//     halfProfit,
//     profitPercentage,
//   };
// };

// export const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount);
// };



export const calculateIPO = (buyPrice, sellPrice, shares) => {
  // Convert to numbers
  const buy = Number(buyPrice) || 0;
  const sell = Number(sellPrice) || 0;
  const sharesNum = Number(shares) || 0;
  
  // Calculate investment
  const investment = buy * sharesNum;
  
  // Calculate sell value
  const sellValue = sell * sharesNum;
  
  // Calculate profit
  const profit = sellValue - investment;
  
  // Calculate half profit
  const halfProfit = profit / 2;
  
  // Calculate profit percentage
  const profitPercentage = investment > 0 ? (profit / investment) * 100 : 0;
  
  // Calculate per share profit
  const perShareProfit = sell - buy;

  return {
    investment,
    sellValue,
    profit,
    halfProfit,
    profitPercentage,
    perShareProfit,
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};