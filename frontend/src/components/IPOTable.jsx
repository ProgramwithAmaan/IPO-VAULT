// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { formatCurrency } from '../utils/calculations';

// const IPOTable = ({ ipos, onView, onEdit, onDelete, search, setSearch, statusFilter, setStatusFilter, sortBy, setSortBy }) => {
//   const [mobileView, setMobileView] = useState('table');

//   const getStatusBadge = (status) => {
//     const classes = {
//       applied: 'status-applied',
//       allotted: 'status-allotted',
//       'not allotted': 'status-not-allotted',
//       sold: 'status-sold',
//       hold: 'status-hold',
//     };
//     return (
//       <span className={`status-badge ${classes[status] || classes.applied}`}>
//         {status}
//       </span>
//     );
//   };

//   // Mobile Card View
//   const MobileCardView = () => (
//     <div className="space-y-3">
//       {ipos.length === 0 ? (
//         <div className="text-center py-8">
//           <div className="text-4xl mb-2">📊</div>
//           <p className="font-semibold" style={{ color: 'var(--theme-text)' }}>No IPO records yet</p>
//           <p className="text-sm mt-1" style={{ color: 'var(--theme-textSecondary)' }}>
//             Start tracking your IPO investments by adding your first IPO.
//           </p>
//         </div>
//       ) : (
//         ipos.map((ipo, index) => (
//           <motion.div
//             key={ipo._id || ipo.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//             className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-xl p-4"
//           >
//             <div className="flex items-start justify-between mb-2">
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--theme-text)' }}>
//                   {ipo.ipoName}
//                 </h3>
//                 <div className="flex items-center gap-2 mt-1">
//                   {getStatusBadge(ipo.status)}
//                   <span className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
//                     {new Date(ipo.applicationDate).toLocaleDateString()}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex gap-1 ml-2 flex-shrink-0">
//                 <button onClick={() => onView(ipo)} className="p-1.5 rounded-lg hover:bg-[var(--theme-card)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 </button>
//                 <button onClick={() => onEdit(ipo)} className="p-1.5 rounded-lg hover:bg-[var(--theme-card)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                 </button>
//                 <button onClick={() => onDelete(ipo)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" style={{ color: '#ef4444' }}>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-3 gap-2 text-xs">
//               <div>
//                 <span className="text-[var(--theme-textSecondary)]">Buy</span>
//                 <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.buyPrice)}</div>
//               </div>
//               <div>
//                 <span className="text-[var(--theme-textSecondary)]">Sell</span>
//                 <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.sellPrice || 0)}</div>
//               </div>
//               <div>
//                 <span className="text-[var(--theme-textSecondary)]">Shares</span>
//                 <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{ipo.numberOfShares}</div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-3 gap-2 text-xs mt-2 pt-2 border-t border-[var(--theme-border)]">
//               <div>
//                 <span className="text-[var(--theme-textSecondary)]">Investment</span>
//                 <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.investmentAmount)}</div>
//               </div>
//               <div>
//                 <span className="text-[var(--theme-textSecondary)]">Profit</span>
//                 <div className={`font-medium ${ipo.profit >= 0 ? 'profit-positive' : 'profit-negative'}`}>
//                   {formatCurrency(ipo.profit)}
//                 </div>
//               </div>
//               <div>
//                 <span className="text-[var(--theme-textSecondary)]">Half</span>
//                 <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.halfProfit)}</div>
//               </div>
//             </div>
            
//             <div className="mt-2 pt-2 border-t border-[var(--theme-border)] flex justify-between text-xs">
//               <span style={{ color: 'var(--theme-textSecondary)' }}>
//                 Sell Value: {formatCurrency(ipo.sellValue || 0)}
//               </span>
//               <span className={ipo.profitPercentage >= 0 ? 'profit-positive' : 'profit-negative'}>
//                 {ipo.profitPercentage?.toFixed(1)}%
//               </span>
//             </div>
//           </motion.div>
//         ))
//       )}
//     </div>
//   );

//   return (
//     <div className="space-y-3 sm:space-y-4">
//       {/* Controls */}
//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//         <h2 className="text-base sm:text-lg font-bold" style={{ color: 'var(--theme-text)' }}>IPO RECORDS</h2>
//         <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
//           <div className="flex gap-2">
//             <input
//               placeholder="🔍 Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-1 sm:flex-none bg-[var(--theme-primary)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-sm text-[var(--theme-text)] placeholder-[var(--theme-textSecondary)] focus:outline-none focus:border-[var(--theme-accent)]"
//               style={{ minWidth: '120px' }}
//             />
//             <button
//               onClick={() => setMobileView(mobileView === 'table' ? 'cards' : 'table')}
//               className="sm:hidden px-3 py-2 rounded-lg border border-[var(--theme-border)] text-sm"
//               style={{ color: 'var(--theme-text)' }}
//             >
//               {mobileView === 'table' ? '📱 Cards' : '📋 Table'}
//             </button>
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="flex-1 sm:flex-none bg-[var(--theme-primary)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-sm text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
//             >
//               <option value="all">All Status</option>
//               <option value="applied">Applied</option>
//               <option value="allotted">Allotted</option>
//               <option value="not allotted">Not Allotted</option>
//               <option value="sold">Sold</option>
//               <option value="hold">Hold</option>
//             </select>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="flex-1 sm:flex-none bg-[var(--theme-primary)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-sm text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
//             >
//               <option value="createdAt-desc">Newest</option>
//               <option value="createdAt-asc">Oldest</option>
//               <option value="ipoName-asc">A-Z</option>
//               <option value="profit-desc">Profit ↓</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden sm:block overflow-x-auto bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-xl">
//         <table className="w-full min-w-[900px]">
//           <thead>
//             <tr className="bg-[var(--theme-primary)] border-b border-[var(--theme-border)]">
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">IPO Name</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Date</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Buy</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Sell</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Shares</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Investment</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Profit</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Half</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">%</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Status</th>
//               <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ipos.length === 0 ? (
//               <tr>
//                 <td colSpan="11" className="px-3 py-8 text-center text-[var(--theme-textSecondary)]">
//                   <div className="text-3xl mb-2">📊</div>
//                   <p className="font-semibold" style={{ color: 'var(--theme-text)' }}>No IPO records yet</p>
//                   <p className="text-sm mt-1">Start tracking your IPO investments by adding your first IPO.</p>
//                 </td>
//               </tr>
//             ) : (
//               ipos.map((ipo, index) => (
//                 <motion.tr
//                   key={ipo._id || ipo.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.03 }}
//                   className="border-b border-[var(--theme-border)] hover:bg-[var(--theme-card)] transition-colors"
//                 >
//                   <td className="px-3 py-2.5 text-sm font-medium" style={{ color: 'var(--theme-text)' }}>{ipo.ipoName}</td>
//                   <td className="px-3 py-2.5 text-xs" style={{ color: 'var(--theme-textSecondary)' }}>{new Date(ipo.applicationDate).toLocaleDateString()}</td>
//                   <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.buyPrice)}</td>
//                   <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.sellPrice || 0)}</td>
//                   <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{ipo.numberOfShares}</td>
//                   <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.investmentAmount)}</td>
//                   <td className={`px-3 py-2.5 text-sm font-medium ${ipo.profit >= 0 ? 'profit-positive' : 'profit-negative'}`}>
//                     {formatCurrency(ipo.profit)}
//                   </td>
//                   <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.halfProfit)}</td>
//                   <td className={`px-3 py-2.5 text-sm font-medium ${ipo.profitPercentage >= 0 ? 'profit-positive' : 'profit-negative'}`}>
//                     {ipo.profitPercentage?.toFixed(1)}%
//                   </td>
//                   <td className="px-3 py-2.5">{getStatusBadge(ipo.status)}</td>
//                   <td className="px-3 py-2.5">
//                     <div className="flex gap-1">
//                       <button onClick={() => onView(ipo)} className="p-1 rounded hover:bg-[var(--theme-card)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       </button>
//                       <button onClick={() => onEdit(ipo)} className="p-1 rounded hover:bg-[var(--theme-card)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                       </button>
//                       <button onClick={() => onDelete(ipo)} className="p-1 rounded hover:bg-red-500/10 transition-colors" style={{ color: '#ef4444' }}>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Card View */}
//       <div className="sm:hidden">
//         <MobileCardView />
//       </div>
//     </div>
//   );
// };

// export default IPOTable;





import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/calculations';

const IPOTable = ({ ipos, onView, onEdit, onDelete, search, setSearch, statusFilter, setStatusFilter, sortBy, setSortBy }) => {
  const [mobileView, setMobileView] = useState('table');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getStatusBadge = (status) => {
    const classes = {
      applied: 'status-applied',
      allotted: 'status-allotted',
      'not allotted': 'status-not-allotted',
      sold: 'status-sold',
      hold: 'status-hold',
    };
    return (
      <span className={`status-badge ${classes[status] || classes.applied}`}>
        {status}
      </span>
    );
  };

  // Mobile Card View
  const MobileCardView = () => (
    <div className="space-y-3">
      {ipos.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📊</div>
          <p className="font-semibold" style={{ color: 'var(--theme-text)' }}>No IPO records yet</p>
          <p className="text-sm mt-1" style={{ color: 'var(--theme-textSecondary)' }}>
            Start tracking your IPO investments by adding your first IPO.
          </p>
        </div>
      ) : (
        ipos.map((ipo, index) => (
          <motion.div
            key={ipo._id || ipo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--theme-text)' }}>
                  {ipo.ipoName}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge(ipo.status)}
                  <span className="text-xs" style={{ color: 'var(--theme-textSecondary)' }}>
                    {new Date(ipo.applicationDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 ml-2 flex-shrink-0">
                <button onClick={() => onView(ipo)} className="p-1.5 rounded-lg hover:bg-[var(--theme-card)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button onClick={() => onEdit(ipo)} className="p-1.5 rounded-lg hover:bg-[var(--theme-card)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => onDelete(ipo)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" style={{ color: '#ef4444' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-[var(--theme-textSecondary)]">Buy</span>
                <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.buyPrice)}</div>
              </div>
              <div>
                <span className="text-[var(--theme-textSecondary)]">Sell</span>
                <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.sellPrice || 0)}</div>
              </div>
              <div>
                <span className="text-[var(--theme-textSecondary)]">Shares</span>
                <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{ipo.numberOfShares}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs mt-2 pt-2 border-t border-[var(--theme-border)]">
              <div>
                <span className="text-[var(--theme-textSecondary)]">Investment</span>
                <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.investmentAmount)}</div>
              </div>
              <div>
                <span className="text-[var(--theme-textSecondary)]">Profit</span>
                <div className={`font-medium ${ipo.profit >= 0 ? 'profit-positive' : 'profit-negative'}`}>
                  {formatCurrency(ipo.profit)}
                </div>
              </div>
              <div>
                <span className="text-[var(--theme-textSecondary)]">Half</span>
                <div className="font-medium" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.halfProfit)}</div>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-[var(--theme-border)] flex justify-between text-xs">
              <span style={{ color: 'var(--theme-textSecondary)' }}>
                Sell Value: {formatCurrency(ipo.sellValue || 0)}
              </span>
              <span className={ipo.profitPercentage >= 0 ? 'profit-positive' : 'profit-negative'}>
                {ipo.profitPercentage?.toFixed(1)}%
              </span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Collapsible Header */}
      <div 
        className="flex items-center justify-between cursor-pointer select-none group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-base sm:text-lg font-bold" style={{ color: 'var(--theme-text)' }}>
            📋 IPO RECORDS
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ 
            background: 'var(--theme-card)',
            color: 'var(--theme-textSecondary)',
            border: '1px solid var(--theme-border)'
          }}>
            {ipos.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
            className="p-1.5 rounded-lg hover:bg-[var(--theme-card)] transition-all duration-200 group-hover:border-[var(--theme-accent)]"
            style={{ 
              color: 'var(--theme-textSecondary)',
              border: '1px solid transparent'
            }}
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <motion.svg 
              className="w-5 h-5 sm:w-6 sm:h-6"
              animate={{ rotate: isCollapsed ? -90 : 0 }}
              transition={{ duration: 0.3 }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto w-full sm:w-auto">
                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    placeholder="🔍 Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 sm:flex-none bg-[var(--theme-primary)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-sm text-[var(--theme-text)] placeholder-[var(--theme-textSecondary)] focus:outline-none focus:border-[var(--theme-accent)]"
                    style={{ minWidth: '120px' }}
                  />
                  <button
                    onClick={() => setMobileView(mobileView === 'table' ? 'cards' : 'table')}
                    className="sm:hidden px-3 py-2 rounded-lg border border-[var(--theme-border)] text-sm"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    {mobileView === 'table' ? '📱 Cards' : '📋 Table'}
                  </button>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 sm:flex-none bg-[var(--theme-primary)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-sm text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                  >
                    <option value="all">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="allotted">Allotted</option>
                    <option value="not allotted">Not Allotted</option>
                    <option value="sold">Sold</option>
                    <option value="hold">Hold</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none bg-[var(--theme-primary)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-sm text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-accent)]"
                  >
                    <option value="createdAt-desc">Newest</option>
                    <option value="createdAt-asc">Oldest</option>
                    <option value="ipoName-asc">A-Z</option>
                    <option value="profit-desc">Profit ↓</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-xl">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-[var(--theme-primary)] border-b border-[var(--theme-border)]">
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">IPO Name</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Date</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Buy</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Sell</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Shares</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Investment</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Profit</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Half</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">%</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-[var(--theme-textSecondary)] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ipos.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="px-3 py-8 text-center text-[var(--theme-textSecondary)]">
                        <div className="text-3xl mb-2">📊</div>
                        <p className="font-semibold" style={{ color: 'var(--theme-text)' }}>No IPO records yet</p>
                        <p className="text-sm mt-1">Start tracking your IPO investments by adding your first IPO.</p>
                      </td>
                    </tr>
                  ) : (
                    ipos.map((ipo, index) => (
                      <motion.tr
                        key={ipo._id || ipo.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-[var(--theme-border)] hover:bg-[var(--theme-card)] transition-colors"
                      >
                        <td className="px-3 py-2.5 text-sm font-medium" style={{ color: 'var(--theme-text)' }}>{ipo.ipoName}</td>
                        <td className="px-3 py-2.5 text-xs" style={{ color: 'var(--theme-textSecondary)' }}>{new Date(ipo.applicationDate).toLocaleDateString()}</td>
                        <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.buyPrice)}</td>
                        <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.sellPrice || 0)}</td>
                        <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{ipo.numberOfShares}</td>
                        <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.investmentAmount)}</td>
                        <td className={`px-3 py-2.5 text-sm font-medium ${ipo.profit >= 0 ? 'profit-positive' : 'profit-negative'}`}>
                          {formatCurrency(ipo.profit)}
                        </td>
                        <td className="px-3 py-2.5 text-sm" style={{ color: 'var(--theme-text)' }}>{formatCurrency(ipo.halfProfit)}</td>
                        <td className={`px-3 py-2.5 text-sm font-medium ${ipo.profitPercentage >= 0 ? 'profit-positive' : 'profit-negative'}`}>
                          {ipo.profitPercentage?.toFixed(1)}%
                        </td>
                        <td className="px-3 py-2.5">{getStatusBadge(ipo.status)}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1">
                            <button onClick={() => onView(ipo)} className="p-1 rounded hover:bg-[var(--theme-card)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button onClick={() => onEdit(ipo)} className="p-1 rounded hover:bg-[var(--theme-card)] transition-colors" style={{ color: 'var(--theme-textSecondary)' }}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => onDelete(ipo)} className="p-1 rounded hover:bg-red-500/10 transition-colors" style={{ color: '#ef4444' }}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden">
              <MobileCardView />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IPOTable;