// import { formatCurrency } from '../utils/calculations';

// const IPODetailsModal = ({ ipo, onClose }) => {
//   if (!ipo) return null;

//   const fields = [
//     { label: 'IPO Name', value: ipo.ipoName },
//     { label: 'IPO Date', value: new Date(ipo.applicationDate).toLocaleDateString() },
//     { label: 'Opening Date', value: new Date(ipo.openingDate).toLocaleDateString() },
//     { label: 'Selling Date', value: ipo.sellingDate ? new Date(ipo.sellingDate).toLocaleDateString() : '—' },
//     { label: 'Buy Price', value: formatCurrency(ipo.buyPrice) },
//     { label: 'Sell Price', value: formatCurrency(ipo.sellPrice || 0) },
//     { label: 'Number of Shares', value: ipo.numberOfShares },
//     { label: 'Investment', value: formatCurrency(ipo.investmentAmount) },
//     { label: 'Profit', value: formatCurrency(ipo.profit) },
//     { label: 'Half Profit', value: formatCurrency(ipo.halfProfit) },
//     { label: 'Profit %', value: `${ipo.profitPercentage?.toFixed(2)}%` },
//     { label: 'Status', value: ipo.status },
//     { label: 'Notes', value: ipo.notes || '—' },
//   ];

//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInUp">
//       <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-slideIn">
//         <div className="flex justify-between items-start mb-6">
//           <h2 className="text-2xl font-bold">{ipo.ipoName}</h2>
//           <button onClick={onClose} className="text-[#9a9a9a] hover:text-white text-2xl">✕</button>
//         </div>
//         <div className="grid grid-cols-2 gap-4 text-sm">
//           {fields.map((field) => (
//             <div key={field.label} className="border-b border-[#2a2a2a] pb-2">
//               <div className="text-[#9a9a9a] text-xs uppercase tracking-wider">{field.label}</div>
//               <div className="font-medium mt-0.5">{field.value}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IPODetailsModal;



import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/calculations';

const IPODetailsModal = ({ ipo, onClose }) => {
  if (!ipo) return null;

  const fields = [
    { label: 'IPO Name', value: ipo.ipoName },
    { label: 'IPO Date', value: new Date(ipo.applicationDate).toLocaleDateString() },
    { label: 'Opening Date', value: new Date(ipo.openingDate).toLocaleDateString() },
    { label: 'Selling Date', value: ipo.sellingDate ? new Date(ipo.sellingDate).toLocaleDateString() : '—' },
    { label: 'Buy Price', value: formatCurrency(ipo.buyPrice) },
    { label: 'Sell Price', value: formatCurrency(ipo.sellPrice || 0) },
    { label: 'Number of Shares', value: ipo.numberOfShares },
    { label: 'Investment', value: formatCurrency(ipo.investmentAmount) },
    { label: 'Profit', value: formatCurrency(ipo.profit) },
    { label: 'Half Profit', value: formatCurrency(ipo.halfProfit) },
    { label: 'Profit %', value: `${ipo.profitPercentage?.toFixed(2)}%` },
    { label: 'Status', value: ipo.status },
    { label: 'Notes', value: ipo.notes || '—' },
  ];

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl hover:text-[var(--theme-accent)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--theme-text)' }}>{ipo.ipoName}</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {fields.map((field) => (
            <div key={field.label} className="border-b pb-2" style={{ borderColor: 'var(--theme-border)' }}>
              <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--theme-textSecondary)' }}>{field.label}</div>
              <div className="font-medium mt-0.5" style={{ color: 'var(--theme-text)' }}>{field.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IPODetailsModal;