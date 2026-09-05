// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { calculateIPO, formatCurrency } from '../utils/calculations';

// const IPOForm = ({ onSubmit, initialData = null, isEditing = false, onCancel }) => {
//   const [formData, setFormData] = useState({
//     ipoName: '',
//     applicationDate: '',
//     openingDate: '',
//     sellingDate: '',
//     buyPrice: '',
//     sellPrice: '',
//     numberOfShares: '',
//     status: 'applied',
//     notes: '',
//   });

//   const [calcResult, setCalcResult] = useState({ 
//     investment: 0, 
//     profit: 0, 
//     halfProfit: 0, 
//     profitPercentage: 0,
//     sellValue: 0 
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         ipoName: initialData.ipoName || '',
//         applicationDate: initialData.applicationDate ? initialData.applicationDate.split('T')[0] : '',
//         openingDate: initialData.openingDate ? initialData.openingDate.split('T')[0] : '',
//         sellingDate: initialData.sellingDate ? initialData.sellingDate.split('T')[0] : '',
//         buyPrice: initialData.buyPrice || '',
//         sellPrice: initialData.sellPrice || '',
//         numberOfShares: initialData.numberOfShares || '',
//         status: initialData.status || 'applied',
//         notes: initialData.notes || '',
//       });
//     }
//   }, [initialData]);

//   useEffect(() => {
//     const buy = parseFloat(formData.buyPrice) || 0;
//     const sell = parseFloat(formData.sellPrice) || 0;
//     const shares = parseFloat(formData.numberOfShares) || 0;
//     const calc = calculateIPO(buy, sell, shares);
//     setCalcResult({
//       ...calc,
//       sellValue: sell * shares
//     });
//   }, [formData.buyPrice, formData.sellPrice, formData.numberOfShares]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const handleReset = () => {
//     setFormData({
//       ipoName: '',
//       applicationDate: '',
//       openingDate: '',
//       sellingDate: '',
//       buyPrice: '',
//       sellPrice: '',
//       numberOfShares: '',
//       status: 'applied',
//       notes: '',
//     });
//   };

//   return (
//     <motion.div 
//       className="form-card relative"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Close Button - Top Right */}
//       <button
//         onClick={onCancel}
//         className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg hover:bg-[var(--theme-card)] transition-all duration-200 group"
//         style={{ color: 'var(--theme-textSecondary)' }}
//         aria-label="Close form"
//       >
//         <svg 
//           className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" 
//           fill="none" 
//           stroke="currentColor" 
//           viewBox="0 0 24 24"
//         >
//           <path 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth={2} 
//             d="M6 18L18 6M6 6l12 12" 
//           />
//         </svg>
//       </button>

//       <div className="flex items-center justify-between mb-4 pr-8 sm:pr-10">
//         <div>
//           <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>
//             {isEditing ? '✏️ Edit IPO' : '➕ Add New IPO'}
//           </h2>
//           <p className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
//             Live calculation updates as you type
//           </p>
//         </div>
//         {/* Optional: Add a small indicator */}
//         <span className="text-xs px-2 py-1 rounded-full" style={{ 
//           background: 'var(--theme-card)',
//           color: 'var(--theme-textSecondary)',
//           border: '1px solid var(--theme-border)'
//         }}>
//           {isEditing ? 'Editing' : 'New'}
//         </span>
//       </div>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="form-grid">
//           <div className="space-y-3">
//             <div className="form-group">
//               <label className="form-label">IPO Name</label>
//               <input
//                 name="ipoName"
//                 placeholder="e.g., Veda Semiconductors"
//                 value={formData.ipoName}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">IPO / Application Date</label>
//               <input
//                 name="applicationDate"
//                 type="date"
//                 value={formData.applicationDate}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Opening Date</label>
//               <input
//                 name="openingDate"
//                 type="date"
//                 value={formData.openingDate}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Selling Date</label>
//               <input
//                 name="sellingDate"
//                 type="date"
//                 value={formData.sellingDate}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//           </div>

//           <div className="space-y-3">
//             <div className="form-group">
//               <label className="form-label">Buy / Issue Price (₹)</label>
//               <input
//                 name="buyPrice"
//                 type="number"
//                 placeholder="0"
//                 value={formData.buyPrice}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Sell Price (₹)</label>
//               <input
//                 name="sellPrice"
//                 type="number"
//                 placeholder="0"
//                 value={formData.sellPrice}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Number of Shares</label>
//               <input
//                 name="numberOfShares"
//                 type="number"
//                 placeholder="0"
//                 value={formData.numberOfShares}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="form-input form-select"
//               >
//                 <option value="applied">Applied</option>
//                 <option value="allotted">Allotted</option>
//                 <option value="not allotted">Not Allotted</option>
//                 <option value="sold">Sold</option>
//                 <option value="hold">Hold</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="form-group form-full">
//           <label className="form-label">Notes</label>
//           <input
//             name="notes"
//             placeholder="Add allotment or exit notes..."
//             value={formData.notes}
//             onChange={handleChange}
//             className="form-input"
//           />
//         </div>

//         {/* Calculations Preview */}
//         <motion.div 
//           className="calculation-panel"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="calculation-item">
//             <div className="calculation-label">Investment</div>
//             <div className="calculation-value">{formatCurrency(calcResult.investment)}</div>
//           </div>
//           <div className="calculation-item">
//             <div className="calculation-label">Sell Value</div>
//             <div className="calculation-value">{formatCurrency(calcResult.sellValue)}</div>
//           </div>
//           <div className="calculation-item">
//             <div className="calculation-label">Profit</div>
//             <div className={`calculation-value ${calcResult.profit >= 0 ? 'red' : ''}`}>
//               {formatCurrency(calcResult.profit)}
//             </div>
//           </div>
//           <div className="calculation-item">
//             <div className="calculation-label">Profit %</div>
//             <div className={`calculation-value ${calcResult.profitPercentage >= 0 ? 'red' : ''}`}>
//               {calcResult.profitPercentage.toFixed(2)}%
//             </div>
//           </div>
//         </motion.div>

//         <div className="form-actions">
//           <button type="submit" className="btn-primary flex-1">
//             {isEditing ? 'UPDATE IPO' : 'SAVE IPO'}
//           </button>
//           {!isEditing && (
//             <button type="button" onClick={handleReset} className="btn-outline">
//               Reset
//             </button>
//           )}
//           {isEditing && (
//             <button type="button" onClick={onCancel} className="btn-outline">
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </motion.div>
//   );
// };

// export default IPOForm;





import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateIPO, formatCurrency } from '../utils/calculations';

const IPOForm = ({ onSubmit, initialData = null, isEditing = false, onCancel }) => {
  const [formData, setFormData] = useState({
    ipoName: '',
    applicationDate: '',
    openingDate: '',
    sellingDate: '',
    buyPrice: '',
    sellPrice: '',
    numberOfShares: '',
    status: 'applied',
    notes: '',
  });

  const [calcResult, setCalcResult] = useState({ 
    investment: 0, 
    sellValue: 0,
    profit: 0, 
    halfProfit: 0, 
    profitPercentage: 0,
    perShareProfit: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ipoName: initialData.ipoName || '',
        applicationDate: initialData.applicationDate ? initialData.applicationDate.split('T')[0] : '',
        openingDate: initialData.openingDate ? initialData.openingDate.split('T')[0] : '',
        sellingDate: initialData.sellingDate ? initialData.sellingDate.split('T')[0] : '',
        buyPrice: initialData.buyPrice || '',
        sellPrice: initialData.sellPrice || '',
        numberOfShares: initialData.numberOfShares || '',
        status: initialData.status || 'applied',
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  useEffect(() => {
    const buy = parseFloat(formData.buyPrice) || 0;
    const sell = parseFloat(formData.sellPrice) || 0;
    const shares = parseFloat(formData.numberOfShares) || 0;
    const calc = calculateIPO(buy, sell, shares);
    setCalcResult(calc);
  }, [formData.buyPrice, formData.sellPrice, formData.numberOfShares]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      ipoName: '',
      applicationDate: '',
      openingDate: '',
      sellingDate: '',
      buyPrice: '',
      sellPrice: '',
      numberOfShares: '',
      status: 'applied',
      notes: '',
    });
  };

  return (
    <motion.div 
      className="form-card relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Close Button */}
      <button
        onClick={onCancel}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg hover:bg-[var(--theme-card)] transition-all duration-200 group"
        style={{ color: 'var(--theme-textSecondary)' }}
        aria-label="Close form"
      >
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>

      <div className="flex items-center justify-between mb-4 pr-8 sm:pr-10">
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>
            {isEditing ? '✏️ Edit IPO' : '➕ Add New IPO'}
          </h2>
          <p className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
            Live calculation updates as you type
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full" style={{ 
          background: 'var(--theme-card)',
          color: 'var(--theme-textSecondary)',
          border: '1px solid var(--theme-border)'
        }}>
          {isEditing ? 'Editing' : 'New'}
        </span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-grid">
          <div className="space-y-3">
            <div className="form-group">
              <label className="form-label">IPO Name</label>
              <input
                name="ipoName"
                placeholder="e.g., Veda Semiconductors"
                value={formData.ipoName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">IPO / Application Date</label>
              <input
                name="applicationDate"
                type="date"
                value={formData.applicationDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Opening Date</label>
              <input
                name="openingDate"
                type="date"
                value={formData.openingDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Selling Date</label>
              <input
                name="sellingDate"
                type="date"
                value={formData.sellingDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="form-group">
              <label className="form-label">Buy / Issue Price (₹)</label>
              <input
                name="buyPrice"
                type="number"
                step="0.01"
                placeholder="0"
                value={formData.buyPrice}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Sell Price (₹)</label>
              <input
                name="sellPrice"
                type="number"
                step="0.01"
                placeholder="0"
                value={formData.sellPrice}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Shares</label>
              <input
                name="numberOfShares"
                type="number"
                placeholder="0"
                value={formData.numberOfShares}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input form-select"
              >
                <option value="applied">Applied</option>
                <option value="allotted">Allotted</option>
                <option value="not allotted">Not Allotted</option>
                <option value="sold">Sold</option>
                <option value="hold">Hold</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group form-full">
          <label className="form-label">Notes</label>
          <input
            name="notes"
            placeholder="Add allotment or exit notes..."
            value={formData.notes}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Calculations Preview */}
        <motion.div 
          className="calculation-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="calculation-item">
            <div className="calculation-label">Investment</div>
            <div className="calculation-value">{formatCurrency(calcResult.investment)}</div>
          </div>
          <div className="calculation-item">
            <div className="calculation-label">Sell Value</div>
            <div className="calculation-value">{formatCurrency(calcResult.sellValue)}</div>
          </div>
          <div className="calculation-item">
            <div className="calculation-label">Profit</div>
            <div className={`calculation-value ${calcResult.profit >= 0 ? 'red' : ''}`}>
              {formatCurrency(calcResult.profit)}
            </div>
          </div>
          <div className="calculation-item">
            <div className="calculation-label">Per Share</div>
            <div className={`calculation-value ${calcResult.perShareProfit >= 0 ? 'red' : ''}`}>
              {formatCurrency(calcResult.perShareProfit)}
            </div>
          </div>
          <div className="calculation-item">
            <div className="calculation-label">Half Profit</div>
            <div className="calculation-value">{formatCurrency(calcResult.halfProfit)}</div>
          </div>
          <div className="calculation-item">
            <div className="calculation-label">Profit %</div>
            <div className={`calculation-value ${calcResult.profitPercentage >= 0 ? 'red' : ''}`}>
              {calcResult.profitPercentage.toFixed(2)}%
            </div>
          </div>
        </motion.div>

        <div className="form-actions">
          <button type="submit" className="btn-primary flex-1">
            {isEditing ? 'UPDATE IPO' : 'SAVE IPO'}
          </button>
          {!isEditing && (
            <button type="button" onClick={handleReset} className="btn-outline">
              Reset
            </button>
          )}
          {isEditing && (
            <button type="button" onClick={onCancel} className="btn-outline">
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default IPOForm;