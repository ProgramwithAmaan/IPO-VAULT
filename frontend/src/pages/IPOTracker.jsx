// import { useState, useEffect, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import api from '../api/axios';
// import { useTheme } from '../context/ThemeContext';
// import { useAuth } from '../context/AuthContext';
// import Header from '../components/Header';
// import StatCard from '../components/StatCard';
// import IPOForm from '../components/IPOForm';
// import IPOTable from '../components/IPOTable';
// import IPODetailsModal from '../components/IPODetailsModal';
// import EditIPOModal from '../components/EditIPOModal';
// import DeleteConfirmation from '../components/DeleteConfirmation';
// import Charts from '../components/Charts';
// import { formatCurrency } from '../utils/calculations';

// const IPOTracker = () => {
//   const { user, loading: authLoading } = useAuth();
//   const navigate = useNavigate();
//   const { currentTheme, themes } = useTheme();
//   const [ipos, setIpos] = useState([]);
//   const [stats, setStats] = useState({
//     totalIPOs: 0,
//     totalInvestment: 0,
//     totalProfit: 0,
//     halfProfit: 0,
//     averageProfit: 0,
//     highestProfit: 0,
//     lowestProfit: 0,
//     profitableIPOs: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('createdAt-desc');
//   const [viewModal, setViewModal] = useState(null);
//   const [editModal, setEditModal] = useState(null);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [error, setError] = useState(null);

//   // Redirect if not authenticated
//   useEffect(() => {
//     if (!authLoading && !user) {
//       navigate('/');
//     }
//   }, [user, authLoading, navigate]);

//   const fetchIPOs = async () => {
//     try {
//       const response = await api.get('/ipos');
//       if (response.data.success) {
//         setIpos(response.data.data || []);
//         setError(null);
//       } else {
//         setIpos([]);
//         setError('Failed to fetch IPOs');
//       }
//     } catch (error) {
//       console.error('Fetch IPOs error:', error);
//       setIpos([]);
//       setError('Failed to connect to server');
//       // Don't show toast here to avoid spam
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await api.get('/ipos/statistics');
//       if (response.data.success) {
//         setStats(response.data.data || {
//           totalIPOs: 0,
//           totalInvestment: 0,
//           totalProfit: 0,
//           halfProfit: 0,
//           averageProfit: 0,
//           highestProfit: 0,
//           lowestProfit: 0,
//           profitableIPOs: 0,
//         });
//       } else {
//         setStats({
//           totalIPOs: 0,
//           totalInvestment: 0,
//           totalProfit: 0,
//           halfProfit: 0,
//           averageProfit: 0,
//           highestProfit: 0,
//           lowestProfit: 0,
//           profitableIPOs: 0,
//         });
//       }
//     } catch (error) {
//       console.error('Fetch stats error:', error);
//       setStats({
//         totalIPOs: 0,
//         totalInvestment: 0,
//         totalProfit: 0,
//         halfProfit: 0,
//         averageProfit: 0,
//         highestProfit: 0,
//         lowestProfit: 0,
//         profitableIPOs: 0,
//       });
//     }
//   };

//   const loadData = async () => {
//     if (!user) return;
//     setLoading(true);
//     setError(null);
//     try {
//       await Promise.all([fetchIPOs(), fetchStats()]);
//     } catch (error) {
//       console.error('Load data error:', error);
//       setError('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       loadData();
//     }
//   }, [user]);

//   const filteredIpos = useMemo(() => {
//     let filtered = [...ipos];
//     if (search) {
//       filtered = filtered.filter(ipo => 
//         ipo.ipoName?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(ipo => ipo.status === statusFilter);
//     }
//     return filtered;
//   }, [ipos, search, statusFilter]);

//   const handleAddIPO = async (data) => {
//     try {
//       const response = await api.post('/ipos', data);
//       if (response.data.success) {
//         toast.success('IPO added successfully! 🎉');
//         await loadData();
//         setShowForm(false);
//       }
//     } catch (error) {
//       const message = error.response?.data?.error || 'Failed to add IPO';
//       toast.error(message);
//     }
//   };

//   const handleEditIPO = async (data) => {
//     try {
//       const response = await api.put(`/ipos/${editModal._id || editModal.id}`, data);
//       if (response.data.success) {
//         toast.success('IPO updated successfully! ✏️');
//         await loadData();
//         setEditModal(null);
//       }
//     } catch (error) {
//       const message = error.response?.data?.error || 'Failed to update IPO';
//       toast.error(message);
//     }
//   };

//   const handleDeleteIPO = async (id) => {
//     try {
//       const response = await api.delete(`/ipos/${id}`);
//       if (response.data.success) {
//         toast.success('IPO deleted successfully! 🗑️');
//         await loadData();
//         setDeleteModal(null);
//       }
//     } catch (error) {
//       const message = error.response?.data?.error || 'Failed to delete IPO';
//       toast.error(message);
//     }
//   };

//   const handleExportExcel = async () => {
//     try {
//       const response = await api.get('/ipos/export/excel', {
//         responseType: 'blob',
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `IPO_Records_${user?.name || 'user'}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       toast.success('Excel exported successfully! 📊');
//     } catch (error) {
//       toast.error('Failed to export Excel');
//     }
//   };

//   const handleExportPDF = async () => {
//     try {
//       const response = await api.get('/ipos/export/pdf', {
//         responseType: 'blob',
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `IPO_Report_${user?.name || 'user'}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       toast.success('PDF exported successfully! 📄');
//     } catch (error) {
//       toast.error('Failed to export PDF');
//     }
//   };

//   const overallReturn = stats.totalInvestment > 0 
//     ? (stats.totalProfit / stats.totalInvestment) * 100 
//     : 0;

//   const openPositions = ipos.filter(i => i.status === 'hold' || i.status === 'applied').length;

//   // Show loading state
//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-primary)' }}>
//         <div className="text-center">
//           <div 
//             className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
//             style={{ borderColor: 'var(--theme-accent)', borderTopColor: 'transparent' }}
//           />
//           <p className="mt-4" style={{ color: 'var(--theme-textSecondary)' }}>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show login prompt if not authenticated
//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-primary)' }}>
//         <div className="text-center">
//           <div className="text-6xl mb-4">🔒</div>
//           <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>Please Sign In</h2>
//           <p className="mt-2" style={{ color: 'var(--theme-textSecondary)' }}>You need to be logged in to view your portfolio</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="app-container"
//     >
//       <Header 
//         onAddClick={() => setShowForm(true)}
//         onExportExcel={handleExportExcel}
//         onExportPDF={handleExportPDF}
//       />

//       <main className="page-container">
//         {error && (
//           <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4 text-red-500">
//             {error}
//           </div>
//         )}

//         {/* Stats Grid */}
//         <motion.div 
//           className="stats-grid"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//         >
//           <StatCard 
//             label="Total IPOs" 
//             value={stats.totalIPOs || 0} 
//             sub={`${openPositions} open positions`}
//             icon="📈"
//           />
//           <StatCard 
//             label="Total Investment" 
//             value={formatCurrency(stats.totalInvestment || 0)} 
//             sub="Across all applications"
//             icon="💰"
//           />
//           <StatCard 
//             label="Total Profit" 
//             value={formatCurrency(stats.totalProfit || 0)} 
//             sub={`${overallReturn.toFixed(1)}% overall return`}
//             icon="📊"
//           />
//           <StatCard 
//             label="Half Profit" 
//             value={formatCurrency(stats.halfProfit || 0)} 
//             sub="50% of net profit"
//             icon="🎯"
//           />
//         </motion.div>

//         {/* Extra Stats */}
//         <motion.div 
//           className="secondary-stats"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="secondary-stat">
//             <div className="secondary-label">Average Profit</div>
//             <div className="secondary-value">{formatCurrency(stats.averageProfit || 0)}</div>
//           </div>
//           <div className="secondary-stat">
//             <div className="secondary-label">Highest Profit</div>
//             <div className="secondary-value red">{formatCurrency(stats.highestProfit || 0)}</div>
//           </div>
//           <div className="secondary-stat">
//             <div className="secondary-label">Lowest Profit</div>
//             <div className="secondary-value" style={{ color: 'var(--theme-textSecondary)' }}>
//               {formatCurrency(stats.lowestProfit || 0)}
//             </div>
//           </div>
//           <div className="secondary-stat">
//             <div className="secondary-label">Profitable IPOs</div>
//             <div className="secondary-value" style={{ color: '#4ade80' }}>
//               {stats.profitableIPOs || 0}/{stats.totalIPOs || 0}
//             </div>
//           </div>
//         </motion.div>

//         {/* Form */}
//         <AnimatePresence>
//           {showForm && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="mb-6 overflow-hidden"
//             >
//               <IPOForm 
//                 onSubmit={handleAddIPO}
//                 onCancel={() => setShowForm(false)}
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Table */}
//         <motion.div 
//           className="mb-8"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <IPOTable
//             ipos={filteredIpos}
//             onView={setViewModal}
//             onEdit={setEditModal}
//             onDelete={setDeleteModal}
//             search={search}
//             setSearch={setSearch}
//             statusFilter={statusFilter}
//             setStatusFilter={setStatusFilter}
//             sortBy={sortBy}
//             setSortBy={setSortBy}
//           />
//         </motion.div>

//         {/* Charts */}
//         {ipos.length > 0 && (
//           <motion.div 
//             className="mb-8"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>Analytics</h2>
//             <Charts ipos={ipos} />
//           </motion.div>
//         )}

//         {/* Export Section */}
//         {ipos.length > 0 && (
//           <motion.div 
//             className="export-section"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5 }}
//           >
//             <div>
//               <div className="export-title">📤 Export your IPO ledger</div>
//               <div className="export-description">
//                 Download all {ipos.length} records for analysis, filing, or archiving.
//               </div>
//             </div>
//             <div className="export-actions">
//               <button
//                 onClick={handleExportExcel}
//                 className="btn-primary"
//               >
//                 Export Excel
//               </button>
//               <button
//                 onClick={handleExportPDF}
//                 className="btn-outline"
//               >
//                 Export PDF
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {/* Modals */}
//         <AnimatePresence>
//           {viewModal && (
//             <IPODetailsModal
//               ipo={viewModal}
//               onClose={() => setViewModal(null)}
//             />
//           )}

//           {editModal && (
//             <EditIPOModal
//               ipo={editModal}
//               onSave={handleEditIPO}
//               onClose={() => setEditModal(null)}
//             />
//           )}

//           {deleteModal && (
//             <DeleteConfirmation
//               ipo={deleteModal}
//               onConfirm={handleDeleteIPO}
//               onCancel={() => setDeleteModal(null)}
//             />
//           )}
//         </AnimatePresence>
//       </main>
//     </motion.div>
//   );
// };

// export default IPOTracker;







import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import IPOForm from '../components/IPOForm';
import IPOTable from '../components/IPOTable';
import IPODetailsModal from '../components/IPODetailsModal';
import EditIPOModal from '../components/EditIPOModal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Charts from '../components/Charts';
import { formatCurrency } from '../utils/calculations';

const IPOTracker = () => {
  const { user } = useAuth();
  const { currentTheme, themes } = useTheme();
  const [ipos, setIpos] = useState([]);
  const [stats, setStats] = useState({
    totalIPOs: 0,
    totalInvestment: 0,
    totalProfit: 0,
    halfProfit: 0,
    averageProfit: 0,
    highestProfit: 0,
    lowestProfit: 0,
    profitableIPOs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [error, setError] = useState(null);

  const fetchIPOs = async () => {
    try {
      const response = await api.get('/ipos');
      if (response.data.success) {
        setIpos(response.data.data || []);
        setError(null);
      } else {
        setIpos([]);
        setError('Failed to fetch IPOs');
      }
    } catch (error) {
      console.error('Fetch IPOs error:', error);
      setIpos([]);
      setError('Failed to connect to server');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/ipos/statistics');
      if (response.data.success) {
        setStats(response.data.data || {
          totalIPOs: 0,
          totalInvestment: 0,
          totalProfit: 0,
          halfProfit: 0,
          averageProfit: 0,
          highestProfit: 0,
          lowestProfit: 0,
          profitableIPOs: 0,
        });
      } else {
        setStats({
          totalIPOs: 0,
          totalInvestment: 0,
          totalProfit: 0,
          halfProfit: 0,
          averageProfit: 0,
          highestProfit: 0,
          lowestProfit: 0,
          profitableIPOs: 0,
        });
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
      setStats({
        totalIPOs: 0,
        totalInvestment: 0,
        totalProfit: 0,
        halfProfit: 0,
        averageProfit: 0,
        highestProfit: 0,
        lowestProfit: 0,
        profitableIPOs: 0,
      });
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchIPOs(), fetchStats()]);
    } catch (error) {
      console.error('Load data error:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredIpos = useMemo(() => {
    let filtered = [...ipos];
    if (search) {
      filtered = filtered.filter(ipo => 
        ipo.ipoName?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ipo => ipo.status === statusFilter);
    }
    return filtered;
  }, [ipos, search, statusFilter]);

  const handleAddIPO = async (data) => {
    try {
      const response = await api.post('/ipos', data);
      if (response.data.success) {
        toast.success('IPO added successfully! 🎉');
        await loadData();
        setShowForm(false);
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to add IPO';
      toast.error(message);
    }
  };

  const handleEditIPO = async (data) => {
    try {
      const response = await api.put(`/ipos/${editModal._id || editModal.id}`, data);
      if (response.data.success) {
        toast.success('IPO updated successfully! ✏️');
        await loadData();
        setEditModal(null);
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update IPO';
      toast.error(message);
    }
  };

  const handleDeleteIPO = async (id) => {
    try {
      const response = await api.delete(`/ipos/${id}`);
      if (response.data.success) {
        toast.success('IPO deleted successfully! 🗑️');
        await loadData();
        setDeleteModal(null);
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete IPO';
      toast.error(message);
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await api.get('/ipos/export/excel', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `IPO_Records_${user?.name || 'user'}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Excel exported successfully! 📊');
    } catch (error) {
      toast.error('Failed to export Excel');
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await api.get('/ipos/export/pdf', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `IPO_Report_${user?.name || 'user'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('PDF exported successfully! 📄');
    } catch (error) {
      toast.error('Failed to export PDF');
    }
  };

  const overallReturn = stats.totalInvestment > 0 
    ? (stats.totalProfit / stats.totalInvestment) * 100 
    : 0;

  const openPositions = ipos.filter(i => i.status === 'hold' || i.status === 'applied').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-primary)' }}>
        <div className="text-center">
          <div 
            className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
            style={{ borderColor: 'var(--theme-accent)', borderTopColor: 'transparent' }}
          />
          <p className="mt-4 text-sm sm:text-base" style={{ color: 'var(--theme-textSecondary)' }}>Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="app-container"
    >
      <Header 
        onAddClick={() => setShowForm(true)}
        onExportExcel={handleExportExcel}
        onExportPDF={handleExportPDF}
      />

      <main className="page-container px-3 sm:px-4 md:px-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <StatCard 
            label="Total IPOs" 
            value={stats.totalIPOs || 0} 
            sub={`${openPositions} open`}
            icon="📈"
            mobile={true}
          />
          <StatCard 
            label="Investment" 
            value={formatCurrency(stats.totalInvestment || 0)} 
            sub="Total"
            icon="💰"
            mobile={true}
          />
          <StatCard 
            label="Profit" 
            value={formatCurrency(stats.totalProfit || 0)} 
            sub={`${overallReturn.toFixed(1)}% return`}
            icon="📊"
            mobile={true}
          />
          <StatCard 
            label="Half Profit" 
            value={formatCurrency(stats.halfProfit || 0)} 
            sub="50% of profit"
            icon="🎯"
            mobile={true}
          />
        </div>

        {/* Secondary Stats - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xs text-[var(--theme-textSecondary)] font-medium uppercase tracking-wider">Avg Profit</div>
            <div className="text-base sm:text-lg font-bold mt-1" style={{ color: 'var(--theme-text)' }}>
              {formatCurrency(stats.averageProfit || 0)}
            </div>
          </div>
          <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xs text-[var(--theme-textSecondary)] font-medium uppercase tracking-wider">Highest</div>
            <div className="text-base sm:text-lg font-bold mt-1" style={{ color: 'var(--theme-accent)' }}>
              {formatCurrency(stats.highestProfit || 0)}
            </div>
          </div>
          <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xs text-[var(--theme-textSecondary)] font-medium uppercase tracking-wider">Lowest</div>
            <div className="text-base sm:text-lg font-bold mt-1" style={{ color: 'var(--theme-textSecondary)' }}>
              {formatCurrency(stats.lowestProfit || 0)}
            </div>
          </div>
          <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xs text-[var(--theme-textSecondary)] font-medium uppercase tracking-wider">Profitable</div>
            <div className="text-base sm:text-lg font-bold mt-1" style={{ color: '#4ade80' }}>
              {stats.profitableIPOs || 0}/{stats.totalIPOs || 0}
            </div>
          </div>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 sm:mb-6 overflow-hidden"
            >
              <IPOForm 
                onSubmit={handleAddIPO}
                onCancel={() => setShowForm(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="mb-6 sm:mb-8">
          <IPOTable
            ipos={filteredIpos}
            onView={setViewModal}
            onEdit={setEditModal}
            onDelete={setDeleteModal}
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {/* Charts */}
        {ipos.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: 'var(--theme-text)' }}>📊 Analytics</h2>
            <Charts ipos={ipos} />
          </div>
        )}

        {/* Export Section */}
        {ipos.length > 0 && (
          <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-xl p-4 sm:p-6">
            <div className="text-center sm:text-left">
              <div className="text-sm sm:text-base font-semibold" style={{ color: 'var(--theme-text)' }}>
                📤 Export your IPO ledger
              </div>
              <div className="text-xs sm:text-sm mt-1" style={{ color: 'var(--theme-textSecondary)' }}>
                Download all {ipos.length} records
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
              <button
                onClick={handleExportExcel}
                className="btn-primary w-full sm:flex-1 py-2.5 text-sm"
              >
                Export Excel
              </button>
              <button
                onClick={handleExportPDF}
                className="btn-outline w-full sm:flex-1 py-2.5 text-sm"
              >
                Export PDF
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {viewModal && (
            <IPODetailsModal
              ipo={viewModal}
              onClose={() => setViewModal(null)}
            />
          )}

          {editModal && (
            <EditIPOModal
              ipo={editModal}
              onSave={handleEditIPO}
              onClose={() => setEditModal(null)}
            />
          )}

          {deleteModal && (
            <DeleteConfirmation
              ipo={deleteModal}
              onConfirm={handleDeleteIPO}
              onCancel={() => setDeleteModal(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
};

export default IPOTracker;