// const DeleteConfirmation = ({ ipo, onConfirm, onCancel }) => {
//   if (!ipo) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInUp">
//       <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl max-w-md w-full p-6 animate-slideIn">
//         <h2 className="text-xl font-bold text-red-500 mb-2">Delete IPO Record?</h2>
//         <p className="text-[#9a9a9a] text-sm mb-6">
//           Are you sure you want to permanently delete "<span className="text-white">{ipo.ipoName}</span>"?
//         </p>
//         <div className="flex gap-3">
//           <button onClick={onCancel} className="flex-1 border border-[#2a2a2a] hover:border-[#dc2626] text-white hover:text-[#dc2626] px-4 py-2 rounded-lg transition-all">
//             Cancel
//           </button>
//           <button onClick={() => onConfirm(ipo._id || ipo.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)]">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmation;



import { motion } from 'framer-motion';

const DeleteConfirmation = ({ ipo, onConfirm, onCancel }) => {
  if (!ipo) return null;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div 
        className="modal-content max-w-md"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--theme-accent)' }}>Delete IPO Record?</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--theme-textSecondary)' }}>
          Are you sure you want to permanently delete "<span style={{ color: 'var(--theme-text)' }}>{ipo.ipoName}</span>"?
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-outline flex-1">
            Cancel
          </button>
          <button onClick={() => onConfirm(ipo._id || ipo.id)} className="btn-danger flex-1">
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteConfirmation;