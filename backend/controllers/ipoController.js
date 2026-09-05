// const IPO = require('../models/IPO');
// const ExcelJS = require('exceljs');
// const PDFDocument = require('pdfkit');
// const moment = require('moment');

// // @desc    Create new IPO
// // @route   POST /api/ipos
// exports.createIPO = async (req, res) => {
//   try {
//     const ipoData = {
//       ...req.body,
//       user: req.user.id, // Add the authenticated user's ID
//     };
    
//     const ipo = new IPO(ipoData);
//     await ipo.save();
//     res.status(201).json({ success: true, data: ipo });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get all IPOs for authenticated user
// // @route   GET /api/ipos
// exports.getIPOs = async (req, res) => {
//   try {
//     const ipos = await IPO.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: ipos });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get single IPO
// // @route   GET /api/ipos/:id
// exports.getIPO = async (req, res) => {
//   try {
//     const ipo = await IPO.findOne({ 
//       _id: req.params.id, 
//       user: req.user.id 
//     });
    
//     if (!ipo) {
//       return res.status(404).json({ success: false, error: 'IPO not found' });
//     }
//     res.status(200).json({ success: true, data: ipo });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Update IPO
// // @route   PUT /api/ipos/:id
// exports.updateIPO = async (req, res) => {
//   try {
//     const ipo = await IPO.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id },
//       req.body,
//       { new: true, runValidators: true }
//     );
    
//     if (!ipo) {
//       return res.status(404).json({ success: false, error: 'IPO not found' });
//     }
//     res.status(200).json({ success: true, data: ipo });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Delete IPO
// // @route   DELETE /api/ipos/:id
// exports.deleteIPO = async (req, res) => {
//   try {
//     const ipo = await IPO.findOneAndDelete({ 
//       _id: req.params.id, 
//       user: req.user.id 
//     });
    
//     if (!ipo) {
//       return res.status(404).json({ success: false, error: 'IPO not found' });
//     }
//     res.status(200).json({ success: true, data: {} });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get statistics for authenticated user
// // @route   GET /api/ipos/statistics
// exports.getStatistics = async (req, res) => {
//   try {
//     const ipos = await IPO.find({ user: req.user.id });
    
//     const stats = {
//       totalIPOs: ipos.length,
//       totalInvestment: ipos.reduce((sum, i) => sum + i.investmentAmount, 0),
//       totalProfit: ipos.reduce((sum, i) => sum + i.profit, 0),
//       halfProfit: ipos.reduce((sum, i) => sum + i.profit, 0) / 2,
//       averageProfit: ipos.length > 0 ? ipos.reduce((sum, i) => sum + i.profit, 0) / ipos.length : 0,
//       highestProfit: ipos.length > 0 ? Math.max(...ipos.map(i => i.profit)) : 0,
//       lowestProfit: ipos.length > 0 ? Math.min(...ipos.map(i => i.profit)) : 0,
//       profitableIPOs: ipos.filter(i => i.profit > 0).length,
//     };
    
//     res.status(200).json({ success: true, data: stats });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Export to Excel (user-specific)
// // @route   GET /api/ipos/export/excel
// exports.exportExcel = async (req, res) => {
//   try {
//     const ipos = await IPO.find({ user: req.user.id }).sort({ createdAt: -1 });
    
//     if (ipos.length === 0) {
//       return res.status(404).json({ success: false, error: 'No IPO records found to export' });
//     }
    
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('IPO Records');

//     worksheet.columns = [
//       { header: 'IPO Name', key: 'ipoName', width: 25 },
//       { header: 'IPO Date', key: 'applicationDate', width: 15 },
//       { header: 'Opening Date', key: 'openingDate', width: 15 },
//       { header: 'Selling Date', key: 'sellingDate', width: 15 },
//       { header: 'Buy Price (₹)', key: 'buyPrice', width: 15 },
//       { header: 'Sell Price (₹)', key: 'sellPrice', width: 15 },
//       { header: 'Shares', key: 'numberOfShares', width: 12 },
//       { header: 'Investment (₹)', key: 'investmentAmount', width: 18 },
//       { header: 'Profit (₹)', key: 'profit', width: 18 },
//       { header: 'Half Profit (₹)', key: 'halfProfit', width: 18 },
//       { header: 'Profit %', key: 'profitPercentage', width: 15 },
//       { header: 'Status', key: 'status', width: 15 },
//       { header: 'Notes', key: 'notes', width: 30 },
//     ];

//     const headerRow = worksheet.getRow(1);
//     headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
//     headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDC2626' } };
//     headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
//     headerRow.height = 30;
//     worksheet.views = [{ state: 'frozen', ySplit: 1 }];

//     ipos.forEach((ipo, index) => {
//       const row = worksheet.addRow({
//         ipoName: ipo.ipoName,
//         applicationDate: moment(ipo.applicationDate).format('YYYY-MM-DD'),
//         openingDate: moment(ipo.openingDate).format('YYYY-MM-DD'),
//         sellingDate: ipo.sellingDate ? moment(ipo.sellingDate).format('YYYY-MM-DD') : '',
//         buyPrice: ipo.buyPrice,
//         sellPrice: ipo.sellPrice,
//         numberOfShares: ipo.numberOfShares,
//         investmentAmount: ipo.investmentAmount,
//         profit: ipo.profit,
//         halfProfit: ipo.halfProfit,
//         profitPercentage: ipo.profitPercentage,
//         status: ipo.status,
//         notes: ipo.notes || '',
//       });
//       row.height = 25;
//       row.alignment = { vertical: 'middle' };
//       if (index % 2 === 0) {
//         row.eachCell((cell) => {
//           cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A1A' } };
//         });
//       }
//     });

//     worksheet.autoFilter = { from: 'A1', to: 'M' + (ipos.length + 1) };

//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', `attachment; filename=IPO_Records_${req.user.name}.xlsx`);
//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Export to PDF (user-specific)
// // @route   GET /api/ipos/export/pdf
// exports.exportPDF = async (req, res) => {
//   try {
//     const ipos = await IPO.find({ user: req.user.id }).sort({ createdAt: -1 });
    
//     if (ipos.length === 0) {
//       return res.status(404).json({ success: false, error: 'No IPO records found to export' });
//     }
    
//     const stats = {
//       totalIPOs: ipos.length,
//       totalInvestment: ipos.reduce((sum, i) => sum + i.investmentAmount, 0),
//       totalProfit: ipos.reduce((sum, i) => sum + i.profit, 0),
//       halfProfit: ipos.reduce((sum, i) => sum + i.profit, 0) / 2,
//       averageProfit: ipos.length > 0 ? ipos.reduce((sum, i) => sum + i.profit, 0) / ipos.length : 0,
//     };

//     const doc = new PDFDocument({ size: 'A4', margins: { top: 50, bottom: 50, left: 50, right: 50 } });
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=IPO_Report_${req.user.name}.pdf`);
//     doc.pipe(res);

//     // Header with user info
//     doc.fillColor('#DC2626').fontSize(24).font('Helvetica-Bold').text('IPO INVESTMENT & PROFIT REPORT', { align: 'center' });
//     doc.moveDown(0.3);
//     doc.fillColor('#666666').fontSize(10).font('Helvetica').text(`User: ${req.user.name}`, { align: 'center' });
//     doc.fillColor('#666666').fontSize(10).font('Helvetica').text(`Generated: ${moment().format('MMMM DD, YYYY HH:mm')}`, { align: 'center' });
//     doc.moveDown(1);

//     doc.fillColor('#000000').fontSize(14).font('Helvetica-Bold').text('SUMMARY', { underline: true });
//     doc.moveDown(0.5);
//     const summaryData = [
//       ['Total IPOs', stats.totalIPOs],
//       ['Total Investment', `₹${stats.totalInvestment.toLocaleString('en-IN')}`],
//       ['Total Profit', `₹${stats.totalProfit.toLocaleString('en-IN')}`],
//       ['Half Profit', `₹${stats.halfProfit.toLocaleString('en-IN')}`],
//       ['Average Profit', `₹${stats.averageProfit.toLocaleString('en-IN')}`],
//     ];
//     doc.fontSize(10).font('Helvetica');
//     summaryData.forEach(([label, value]) => {
//       doc.text(`${label}:`, { continued: true })
//          .fillColor('#DC2626')
//          .text(` ${value}`, { align: 'right' })
//          .fillColor('#000000');
//     });
//     doc.moveDown(1.5);

//     doc.fontSize(14).font('Helvetica-Bold').text('IPO RECORDS', { underline: true });
//     doc.moveDown(0.5);

//     const headers = ['Name', 'Buy', 'Sell', 'Shares', 'Investment', 'Profit', 'Status'];
//     const columnWidths = [80, 45, 45, 40, 60, 60, 50];
//     let y = doc.y;

//     doc.fillColor('#DC2626').fontSize(9).font('Helvetica-Bold');
//     let x = 50;
//     headers.forEach((header, i) => {
//       doc.text(header, x, y, { width: columnWidths[i], align: 'center' });
//       x += columnWidths[i];
//     });
//     doc.moveDown(0.3);
//     doc.fillColor('#000000').fontSize(8).font('Helvetica');

//     ipos.slice(0, 30).forEach((ipo, index) => {
//       y = doc.y;
//       x = 50;
//       const rowData = [
//         ipo.ipoName.substring(0, 15),
//         `₹${ipo.buyPrice}`,
//         `₹${ipo.sellPrice}`,
//         ipo.numberOfShares,
//         `₹${ipo.investmentAmount}`,
//         `₹${ipo.profit}`,
//         ipo.status,
//       ];
//       if (index % 2 === 0) {
//         doc.rect(50, y - 2, 380, 16).fill('#F5F5F5');
//       }
//       rowData.forEach((data, i) => {
//         doc.fillColor('#000000');
//         doc.text(data, x, y, { width: columnWidths[i], align: 'center' });
//         x += columnWidths[i];
//       });
//       doc.moveDown(0.8);
//     });

//     if (ipos.length > 30) {
//       doc.fillColor('#666666').fontSize(8).text(`... and ${ipos.length - 30} more records`, { align: 'center' });
//     }

//     doc.end();
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };











const IPO = require('../models/IPO');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const moment = require('moment');

// @desc    Create new IPO
// @route   POST /api/ipos
exports.createIPO = async (req, res) => {
  try {
    const ipoData = {
      ...req.body,
      user: req.user.id,
    };
    
    const ipo = new IPO(ipoData);
    await ipo.save();
    res.status(201).json({ success: true, data: ipo });
  } catch (error) {
    console.error('Create IPO error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all IPOs for authenticated user
// @route   GET /api/ipos
exports.getIPOs = async (req, res) => {
  try {
    const ipos = await IPO.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: ipos });
  } catch (error) {
    console.error('Get IPOs error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single IPO
// @route   GET /api/ipos/:id
exports.getIPO = async (req, res) => {
  try {
    const ipo = await IPO.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    
    if (!ipo) {
      return res.status(404).json({ success: false, error: 'IPO not found' });
    }
    res.status(200).json({ success: true, data: ipo });
  } catch (error) {
    console.error('Get IPO error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update IPO
// @route   PUT /api/ipos/:id
exports.updateIPO = async (req, res) => {
  try {
    const ipo = await IPO.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!ipo) {
      return res.status(404).json({ success: false, error: 'IPO not found' });
    }
    res.status(200).json({ success: true, data: ipo });
  } catch (error) {
    console.error('Update IPO error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete IPO
// @route   DELETE /api/ipos/:id
exports.deleteIPO = async (req, res) => {
  try {
    const ipo = await IPO.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    
    if (!ipo) {
      return res.status(404).json({ success: false, error: 'IPO not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Delete IPO error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get statistics for authenticated user
// @route   GET /api/ipos/statistics
exports.getStatistics = async (req, res) => {
  try {
    const ipos = await IPO.find({ user: req.user.id });
    
    const totalInvestment = ipos.reduce((sum, i) => sum + (i.investmentAmount || 0), 0);
    const totalProfit = ipos.reduce((sum, i) => sum + (i.profit || 0), 0);
    const totalSellValue = ipos.reduce((sum, i) => sum + (i.sellValue || 0), 0);
    
    const stats = {
      totalIPOs: ipos.length,
      totalInvestment: totalInvestment,
      totalSellValue: totalSellValue,
      totalProfit: totalProfit,
      halfProfit: totalProfit / 2,
      averageProfit: ipos.length > 0 ? totalProfit / ipos.length : 0,
      highestProfit: ipos.length > 0 ? Math.max(...ipos.map(i => i.profit || 0)) : 0,
      lowestProfit: ipos.length > 0 ? Math.min(...ipos.map(i => i.profit || 0)) : 0,
      profitableIPOs: ipos.filter(i => (i.profit || 0) > 0).length,
      lossIPOs: ipos.filter(i => (i.profit || 0) < 0).length,
    };
    
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Export to Excel
// @route   GET /api/ipos/export/excel
exports.exportExcel = async (req, res) => {
  try {
    const ipos = await IPO.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    if (ipos.length === 0) {
      return res.status(404).json({ success: false, error: 'No IPO records found to export' });
    }
    
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'IPO Tracker';
    workbook.created = new Date();
    
    const worksheet = workbook.addWorksheet('IPO Records');

    // Define columns
    worksheet.columns = [
      { header: 'IPO Name', key: 'ipoName', width: 25 },
      { header: 'IPO Date', key: 'applicationDate', width: 15 },
      { header: 'Opening Date', key: 'openingDate', width: 15 },
      { header: 'Selling Date', key: 'sellingDate', width: 15 },
      { header: 'Buy Price (₹)', key: 'buyPrice', width: 15 },
      { header: 'Sell Price (₹)', key: 'sellPrice', width: 15 },
      { header: 'Shares', key: 'numberOfShares', width: 12 },
      { header: 'Investment (₹)', key: 'investmentAmount', width: 18 },
      { header: 'Sell Value (₹)', key: 'sellValue', width: 18 },
      { header: 'Profit (₹)', key: 'profit', width: 18 },
      { header: 'Half Profit (₹)', key: 'halfProfit', width: 18 },
      { header: 'Profit %', key: 'profitPercentage', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Notes', key: 'notes', width: 30 },
    ];

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDC2626' } };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 30;
    
    // Freeze header row
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    // Add data rows
    ipos.forEach((ipo, index) => {
      const row = worksheet.addRow({
        ipoName: ipo.ipoName,
        applicationDate: moment(ipo.applicationDate).format('YYYY-MM-DD'),
        openingDate: moment(ipo.openingDate).format('YYYY-MM-DD'),
        sellingDate: ipo.sellingDate ? moment(ipo.sellingDate).format('YYYY-MM-DD') : '',
        buyPrice: ipo.buyPrice,
        sellPrice: ipo.sellPrice,
        numberOfShares: ipo.numberOfShares,
        investmentAmount: ipo.investmentAmount,
        sellValue: ipo.sellValue || 0,
        profit: ipo.profit,
        halfProfit: ipo.halfProfit,
        profitPercentage: ipo.profitPercentage,
        status: ipo.status,
        notes: ipo.notes || '',
      });
      
      row.height = 25;
      row.alignment = { vertical: 'middle' };
      
      // Alternate row colors
      if (index % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A1A' } };
        });
      }
    });

    // Add auto filter
    worksheet.autoFilter = { from: 'A1', to: 'N' + (ipos.length + 1) };

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=IPO_Records_${req.user.name || 'user'}.xlsx`);
    
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export Excel error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Export to PDF
// @route   GET /api/ipos/export/pdf
exports.exportPDF = async (req, res) => {
  try {
    const ipos = await IPO.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    if (ipos.length === 0) {
      return res.status(404).json({ success: false, error: 'No IPO records found to export' });
    }
    
    const totalInvestment = ipos.reduce((sum, i) => sum + (i.investmentAmount || 0), 0);
    const totalProfit = ipos.reduce((sum, i) => sum + (i.profit || 0), 0);
    
    const stats = {
      totalIPOs: ipos.length,
      totalInvestment: totalInvestment,
      totalProfit: totalProfit,
      halfProfit: totalProfit / 2,
      averageProfit: ipos.length > 0 ? totalProfit / ipos.length : 0,
    };

    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=IPO_Report_${req.user.name || 'user'}.pdf`);
    doc.pipe(res);

    // Header
    doc.fillColor('#DC2626')
       .fontSize(24)
       .font('Helvetica-Bold')
       .text('IPO INVESTMENT & PROFIT REPORT', { align: 'center' });
    
    doc.moveDown(0.3);
    
    doc.fillColor('#666666')
       .fontSize(10)
       .font('Helvetica')
       .text(`User: ${req.user.name || 'User'}`, { align: 'center' });
    
    doc.fillColor('#666666')
       .fontSize(10)
       .font('Helvetica')
       .text(`Generated: ${moment().format('MMMM DD, YYYY HH:mm')}`, { align: 'center' });
    
    doc.moveDown(1);

    // Summary Section
    doc.fillColor('#000000')
       .fontSize(14)
       .font('Helvetica-Bold')
       .text('SUMMARY', { underline: true });
    
    doc.moveDown(0.5);
    
    const summaryData = [
      ['Total IPOs', stats.totalIPOs],
      ['Total Investment', `₹${stats.totalInvestment.toLocaleString('en-IN')}`],
      ['Total Profit', `₹${stats.totalProfit.toLocaleString('en-IN')}`],
      ['Half Profit', `₹${stats.halfProfit.toLocaleString('en-IN')}`],
      ['Average Profit', `₹${stats.averageProfit.toLocaleString('en-IN')}`],
    ];

    doc.fontSize(10).font('Helvetica');
    summaryData.forEach(([label, value]) => {
      doc.text(`${label}:`, { continued: true })
         .fillColor('#DC2626')
         .text(` ${value}`, { align: 'right' })
         .fillColor('#000000');
    });

    doc.moveDown(1.5);

    // Records Table
    doc.fontSize(14)
       .font('Helvetica-Bold')
       .text('IPO RECORDS', { underline: true });
    
    doc.moveDown(0.5);

    // Table headers
    const headers = ['Name', 'Buy', 'Sell', 'Shares', 'Investment', 'Profit', 'Status'];
    const columnWidths = [80, 45, 45, 40, 60, 60, 50];
    let y = doc.y;

    // Draw header row
    doc.fillColor('#DC2626').fontSize(9).font('Helvetica-Bold');
    let x = 50;
    headers.forEach((header, i) => {
      doc.text(header, x, y, { width: columnWidths[i], align: 'center' });
      x += columnWidths[i];
    });

    doc.moveDown(0.3);
    doc.fillColor('#000000').fontSize(8).font('Helvetica');

    // Draw data rows
    ipos.slice(0, 30).forEach((ipo, index) => {
      y = doc.y;
      x = 50;
      const rowData = [
        ipo.ipoName.substring(0, 15),
        `₹${ipo.buyPrice}`,
        `₹${ipo.sellPrice || 0}`,
        ipo.numberOfShares,
        `₹${ipo.investmentAmount}`,
        `₹${ipo.profit}`,
        ipo.status,
      ];

      // Alternate row background
      if (index % 2 === 0) {
        doc.rect(50, y - 2, 380, 16).fill('#F5F5F5');
      }

      rowData.forEach((data, i) => {
        doc.fillColor('#000000');
        doc.text(data, x, y, { width: columnWidths[i], align: 'center' });
        x += columnWidths[i];
      });

      doc.moveDown(0.8);
    });

    if (ipos.length > 30) {
      doc.fillColor('#666666')
         .fontSize(8)
         .text(`... and ${ipos.length - 30} more records`, { align: 'center' });
    }

    // Footer
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fillColor('#666666')
         .fontSize(8)
         .text(
           `Page ${i + 1} of ${pageCount}`,
           50,
           doc.page.height - 30,
           { align: 'center' }
         );
    }

    doc.end();
  } catch (error) {
    console.error('Export PDF error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};