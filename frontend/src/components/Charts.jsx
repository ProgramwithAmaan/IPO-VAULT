// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

// const Charts = ({ ipos }) => {
//   if (ipos.length === 0) {
//     return (
//       <div className="analytics-grid">
//         <div className="analytics-card flex items-center justify-center" style={{ color: 'var(--theme-textSecondary)' }}>
//           No data to display
//         </div>
//         <div className="analytics-card flex items-center justify-center" style={{ color: 'var(--theme-textSecondary)' }}>
//           No data to display
//         </div>
//       </div>
//     );
//   }

//   const barData = ipos.slice(0, 10).map(ipo => ({
//     name: ipo.ipoName.length > 20 ? ipo.ipoName.substring(0, 20) + '...' : ipo.ipoName,
//     profit: ipo.profit,
//     isPositive: ipo.profit >= 0
//   }));

//   return (
//     <div className="analytics-grid">
//       <div className="analytics-card">
//         <h3 className="analytics-title">📊 Profit by IPO</h3>
//         <div className="h-72">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" horizontal={false} />
//               <XAxis 
//                 type="number" 
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 11 }}
//                 tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
//               />
//               <YAxis 
//                 type="category" 
//                 dataKey="name" 
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 11 }}
//                 width={150}
//               />
//               <Tooltip
//                 contentStyle={{ 
//                   background: 'var(--theme-secondary)', 
//                   border: '1px solid var(--theme-border)', 
//                   color: 'var(--theme-text)',
//                   borderRadius: '8px',
//                   padding: '10px'
//                 }}
//                 formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Profit']}
//               />
//               <Bar dataKey="profit" radius={[0, 4, 4, 0]}>
//                 {barData.map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={entry.isPositive ? 'var(--theme-accent)' : 'var(--theme-textSecondary)'} 
//                     opacity={0.8}
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="analytics-card">
//         <h3 className="analytics-title">📈 Investment vs Profit</h3>
//         <div className="h-72">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
//               <XAxis 
//                 dataKey="name" 
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
//                 interval={0}
//               />
//               <YAxis 
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
//                 tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
//               />
//               <Tooltip
//                 contentStyle={{ 
//                   background: 'var(--theme-secondary)', 
//                   border: '1px solid var(--theme-border)', 
//                   color: 'var(--theme-text)',
//                   borderRadius: '8px',
//                   padding: '10px'
//                 }}
//               />
//               <Bar dataKey="profit" fill="var(--theme-accent)" radius={[4, 4, 0, 0]} opacity={0.7} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;




// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area, ComposedChart, Legend } from 'recharts';

// const Charts = ({ ipos }) => {
//   if (ipos.length === 0) {
//     return (
//       <div className="analytics-grid">
//         <div className="analytics-card flex items-center justify-center" style={{ color: 'var(--theme-textSecondary)' }}>
//           <div className="text-center">
//             <div className="text-4xl mb-2">📊</div>
//             <p>No data to display</p>
//           </div>
//         </div>
//         <div className="analytics-card flex items-center justify-center" style={{ color: 'var(--theme-textSecondary)' }}>
//           <div className="text-center">
//             <div className="text-4xl mb-2">📈</div>
//             <p>No data to display</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Sort IPOs by date for proper line chart
//   const sortedIPOs = [...ipos].sort((a, b) => 
//     new Date(a.applicationDate) - new Date(b.applicationDate)
//   );

//   // Prepare data for line chart - Profit trend over time
//   const lineData = sortedIPOs.map(ipo => ({
//     name: ipo.ipoName.length > 15 ? ipo.ipoName.substring(0, 15) + '...' : ipo.ipoName,
//     profit: ipo.profit,
//     investment: ipo.investmentAmount,
//     date: new Date(ipo.applicationDate).toLocaleDateString(),
//     fullName: ipo.ipoName,
//     isPositive: ipo.profit >= 0
//   }));

//   // Prepare data for comparison chart - Investment vs Profit
//   const comparisonData = sortedIPOs.map(ipo => ({
//     name: ipo.ipoName.length > 15 ? ipo.ipoName.substring(0, 15) + '...' : ipo.ipoName,
//     investment: ipo.investmentAmount,
//     profit: ipo.profit,
//     fullName: ipo.ipoName,
//     isPositive: ipo.profit >= 0
//   }));

//   // Custom tooltip for line chart
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-lg p-3 text-sm">
//           <p className="font-semibold" style={{ color: 'var(--theme-text)' }}>
//             {data.fullName || data.name}
//           </p>
//           <p style={{ color: 'var(--theme-textSecondary)' }}>
//             Date: {data.date || 'N/A'}
//           </p>
//           <p style={{ color: 'var(--theme-textSecondary)' }}>
//             Profit: <span style={{ color: data.isPositive ? 'var(--theme-accent)' : '#ef4444' }}>
//               ₹{data.profit.toLocaleString('en-IN')}
//             </span>
//           </p>
//           <p style={{ color: 'var(--theme-textSecondary)' }}>
//             Investment: ₹{data.investment.toLocaleString('en-IN')}
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Custom tooltip for comparison chart
//   const ComparisonTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-lg p-3 text-sm">
//           <p className="font-semibold" style={{ color: 'var(--theme-text)' }}>
//             {data.fullName || data.name}
//           </p>
//           <p style={{ color: 'var(--theme-textSecondary)' }}>
//             Investment: <span style={{ color: '#60a5fa' }}>
//               ₹{data.investment.toLocaleString('en-IN')}
//             </span>
//           </p>
//           <p style={{ color: 'var(--theme-textSecondary)' }}>
//             Profit: <span style={{ color: data.isPositive ? 'var(--theme-accent)' : '#ef4444' }}>
//               ₹{data.profit.toLocaleString('en-IN')}
//             </span>
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="analytics-grid">
//       {/* Line Chart - Profit Trend */}
//       <div className="analytics-card">
//         <h3 className="analytics-title">📈 Profit Trend by IPO</h3>
//         <div className="h-72">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={lineData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
//               <XAxis 
//                 dataKey="name" 
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
//                 interval={0}
//                 angle={-20}
//                 textAnchor="end"
//                 height={50}
//               />
//               <YAxis 
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
//                 tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
//               />
//               <Tooltip content={<CustomTooltip />} />
//               <Legend 
//                 wrapperStyle={{ color: 'var(--theme-textSecondary)' }}
//                 iconType="circle"
//               />
//               <Line 
//                 type="monotone" 
//                 dataKey="profit" 
//                 stroke="var(--theme-accent)" 
//                 strokeWidth={3}
//                 dot={{ 
//                   fill: 'var(--theme-secondary)',
//                   stroke: 'var(--theme-accent)',
//                   strokeWidth: 2,
//                   r: 5
//                 }}
//                 activeDot={{ 
//                   r: 8,
//                   stroke: 'var(--theme-accent)',
//                   strokeWidth: 2
//                 }}
//                 name="Profit"
//               />
//               {/* Add area under the line for better visualization */}
//               <Area 
//                 type="monotone" 
//                 dataKey="profit" 
//                 fill="var(--theme-accent)" 
//                 fillOpacity={0.1}
//                 stroke="none"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Composed Chart - Investment vs Profit with Line */}
//       <div className="analytics-card">
//         <h3 className="analytics-title">📊 Investment vs Profit Comparison</h3>
//         <div className="h-72">
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart data={comparisonData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
//               <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
//               <XAxis 
//                 dataKey="name" 
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
//                 interval={0}
//                 angle={-20}
//                 textAnchor="end"
//                 height={50}
//               />
//               <YAxis 
//                 yAxisId="left"
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
//                 tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
//               />
//               <YAxis 
//                 yAxisId="right"
//                 orientation="right"
//                 tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
//                 tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
//               />
//               <Tooltip content={<ComparisonTooltip />} />
//               <Legend 
//                 wrapperStyle={{ color: 'var(--theme-textSecondary)' }}
//                 iconType="circle"
//               />
//               <Bar 
//                 yAxisId="left"
//                 dataKey="investment" 
//                 fill="#60a5fa" 
//                 opacity={0.6}
//                 radius={[4, 4, 0, 0]}
//                 name="Investment"
//               />
//               <Line 
//                 yAxisId="right"
//                 type="monotone" 
//                 dataKey="profit" 
//                 stroke="var(--theme-accent)" 
//                 strokeWidth={3}
//                 dot={{ 
//                   fill: 'var(--theme-secondary)',
//                   stroke: 'var(--theme-accent)',
//                   strokeWidth: 2,
//                   r: 5
//                 }}
//                 activeDot={{ 
//                   r: 8,
//                   stroke: 'var(--theme-accent)',
//                   strokeWidth: 2
//                 }}
//                 name="Profit"
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;





import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const Charts = ({ ipos }) => {
  if (ipos.length === 0) {
    return (
      <div className="analytics-grid">
        <div className="analytics-card flex items-center justify-center" style={{ color: 'var(--theme-textSecondary)' }}>
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>No data to display</p>
          </div>
        </div>
        <div className="analytics-card flex items-center justify-center" style={{ color: 'var(--theme-textSecondary)' }}>
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p>No data to display</p>
          </div>
        </div>
      </div>
    );
  }

  // Sort IPOs by date for proper line chart
  const sortedIPOs = [...ipos].sort((a, b) => 
    new Date(a.applicationDate) - new Date(b.applicationDate)
  );

  // Prepare data for line charts
  const chartData = sortedIPOs.map(ipo => ({
    name: ipo.ipoName.length > 15 ? ipo.ipoName.substring(0, 15) + '...' : ipo.ipoName,
    profit: ipo.profit,
    investment: ipo.investmentAmount,
    fullName: ipo.ipoName,
    isPositive: ipo.profit >= 0
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[var(--theme-secondary)] border border-[var(--theme-border)] rounded-lg p-3 text-sm">
          <p className="font-semibold" style={{ color: 'var(--theme-text)' }}>
            {data.fullName || data.name}
          </p>
          <p style={{ color: 'var(--theme-textSecondary)' }}>
            Profit: <span style={{ color: data.isPositive ? 'var(--theme-accent)' : '#ef4444' }}>
              ₹{data.profit.toLocaleString('en-IN')}
            </span>
          </p>
          <p style={{ color: 'var(--theme-textSecondary)' }}>
            Investment: ₹{data.investment.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics-grid">
      {/* Line Chart 1 - Profit Trend */}
      <div className="analytics-card">
        <h3 className="analytics-title">📈 Profit Trend by IPO</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis 
                tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
                tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ color: 'var(--theme-textSecondary)' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="var(--theme-accent)" 
                strokeWidth={3}
                dot={{ 
                  fill: 'var(--theme-secondary)',
                  stroke: 'var(--theme-accent)',
                  strokeWidth: 2,
                  r: 5
                }}
                activeDot={{ 
                  r: 8,
                  stroke: 'var(--theme-accent)',
                  strokeWidth: 2
                }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart 2 - Investment vs Profit */}
      <div className="analytics-card">
        <h3 className="analytics-title">📊 Investment vs Profit</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={50}
              />
              <YAxis 
                tick={{ fill: 'var(--theme-textSecondary)', fontSize: 10 }}
                tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ color: 'var(--theme-textSecondary)' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="investment" 
                stroke="#60a5fa" 
                strokeWidth={3}
                dot={{ 
                  fill: 'var(--theme-secondary)',
                  stroke: '#60a5fa',
                  strokeWidth: 2,
                  r: 5
                }}
                activeDot={{ 
                  r: 8,
                  stroke: '#60a5fa',
                  strokeWidth: 2
                }}
                name="Investment"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="var(--theme-accent)" 
                strokeWidth={3}
                dot={{ 
                  fill: 'var(--theme-secondary)',
                  stroke: 'var(--theme-accent)',
                  strokeWidth: 2,
                  r: 5
                }}
                activeDot={{ 
                  r: 8,
                  stroke: 'var(--theme-accent)',
                  strokeWidth: 2
                }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;