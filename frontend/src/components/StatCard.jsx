// import { motion } from 'framer-motion';

// const StatCard = ({ label, value, sub, icon }) => {
//   return (
//     <motion.div 
//       className="stat-card"
//       whileHover={{ scale: 1.02, y: -3 }}
//       whileTap={{ scale: 0.98 }}
//       transition={{ type: 'spring', stiffness: 400, damping: 25 }}
//     >
//       {icon && <div className="stat-icon">{icon}</div>}
//       <div className="stat-label">{label}</div>
//       <div className="stat-value">{value}</div>
//       {sub && <div className="stat-sub">{sub}</div>}
//     </motion.div>
//   );
// };

// export default StatCard;



import { motion } from 'framer-motion';

const StatCard = ({ label, value, sub, icon, mobile = false }) => {
  return (
    <motion.div 
      className="stat-card"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        padding: mobile ? '12px 14px' : '18px 20px',
        minHeight: mobile ? '70px' : 'auto',
        background: 'var(--theme-card)',
        border: '1px solid var(--theme-border)',
        borderRadius: '10px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--theme-accent)] opacity-0 hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate" style={{ color: 'var(--theme-textSecondary)' }}>
            {label}
          </div>
          <div className={`font-extrabold ${mobile ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'} mt-1 truncate`} style={{ color: 'var(--theme-text)' }}>
            {value}
          </div>
          {sub && (
            <div className={`${mobile ? 'text-[9px] sm:text-xs' : 'text-xs'} mt-0.5 truncate`} style={{ color: 'var(--theme-textSecondary)' }}>
              {sub}
            </div>
          )}
        </div>
        {icon && (
          <div className={`${mobile ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} ml-2 flex-shrink-0 opacity-50`}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;