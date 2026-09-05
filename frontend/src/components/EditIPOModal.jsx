// import IPOForm from './IPOForm';

// const EditIPOModal = ({ ipo, onSave, onClose }) => {
//   if (!ipo) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeInUp">
//       <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 animate-slideIn">
//         <div className="flex justify-between items-start mb-4">
//           <h2 className="text-xl font-bold">Edit IPO</h2>
//           <button onClick={onClose} className="text-[#9a9a9a] hover:text-white text-2xl">✕</button>
//         </div>
//         <IPOForm
//           initialData={ipo}
//           isEditing={true}
//           onSubmit={onSave}
//           onCancel={onClose}
//         />
//       </div>
//     </div>
//   );
// };

// export default EditIPOModal;



import { motion } from 'framer-motion';
import IPOForm from './IPOForm';

const EditIPOModal = ({ ipo, onSave, onClose }) => {
  if (!ipo) return null;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content max-w-3xl"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl hover:text-[var(--theme-accent)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
          ✕
        </button>
        <IPOForm
          initialData={ipo}
          isEditing={true}
          onSubmit={onSave}
          onCancel={onClose}
        />
      </motion.div>
    </motion.div>
  );
};

export default EditIPOModal;