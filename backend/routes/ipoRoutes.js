// const express = require('express');
// const router = express.Router();
// const {
//   createIPO,
//   getIPOs,
//   getIPO,
//   updateIPO,
//   deleteIPO,
//   getStatistics,
//   exportExcel,
//   exportPDF,
// } = require('../controllers/ipoController');
// const { protect } = require('../middleware/auth');

// // All routes require authentication
// router.use(protect);

// router.route('/')
//   .post(createIPO)
//   .get(getIPOs);

// router.route('/statistics')
//   .get(getStatistics);

// router.route('/export/excel')
//   .get(exportExcel);

// router.route('/export/pdf')
//   .get(exportPDF);

// router.route('/:id')
//   .get(getIPO)
//   .put(updateIPO)
//   .delete(deleteIPO);

// module.exports = router;






const express = require('express');
const router = express.Router();
const {
  createIPO,
  getIPOs,
  getIPO,
  updateIPO,
  deleteIPO,
  getStatistics,
  exportExcel,
  exportPDF,
} = require('../controllers/ipoController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Route definitions
router.route('/')
  .post(createIPO)
  .get(getIPOs);

router.route('/statistics')
  .get(getStatistics);

router.route('/export/excel')
  .get(exportExcel);

router.route('/export/pdf')
  .get(exportPDF);

router.route('/:id')
  .get(getIPO)
  .put(updateIPO)
  .delete(deleteIPO);

module.exports = router;