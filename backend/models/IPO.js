// const mongoose = require('mongoose');

// const IPOSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   ipoName: {
//     type: String,
//     required: [true, 'IPO name is required'],
//     trim: true,
//   },
//   applicationDate: {
//     type: Date,
//     required: [true, 'Application date is required'],
//   },
//   openingDate: {
//     type: Date,
//     required: [true, 'Opening date is required'],
//   },
//   sellingDate: {
//     type: Date,
//     default: null,
//   },
//   buyPrice: {
//     type: Number,
//     required: [true, 'Buy price is required'],
//     min: 0,
//   },
//   sellPrice: {
//     type: Number,
//     default: 0,
//     min: 0,
//   },
//   numberOfShares: {
//     type: Number,
//     required: [true, 'Number of shares is required'],
//     min: 1,
//   },
//   investmentAmount: {
//     type: Number,
//     default: 0,
//   },
//   profit: {
//     type: Number,
//     default: 0,
//   },
//   halfProfit: {
//     type: Number,
//     default: 0,
//   },
//   profitPercentage: {
//     type: Number,
//     default: 0,
//   },
//   status: {
//     type: String,
//     enum: ['applied', 'allotted', 'not allotted', 'sold', 'hold'],
//     default: 'applied',
//   },
//   notes: {
//     type: String,
//     trim: true,
//     default: '',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// IPOSchema.pre('save', function(next) {
//   const investment = this.buyPrice * this.numberOfShares;
//   const profit = (this.sellPrice - this.buyPrice) * this.numberOfShares;
//   const halfProfit = profit / 2;
//   const profitPercentage = investment > 0 ? (profit / investment) * 100 : 0;

//   this.investmentAmount = investment;
//   this.profit = profit;
//   this.halfProfit = halfProfit;
//   this.profitPercentage = profitPercentage;
//   this.updatedAt = Date.now();
  
//   next();
// });

// module.exports = mongoose.model('IPO', IPOSchema);




const mongoose = require('mongoose');

const IPOSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ipoName: {
    type: String,
    required: [true, 'IPO name is required'],
    trim: true,
  },
  applicationDate: {
    type: Date,
    required: [true, 'Application date is required'],
  },
  openingDate: {
    type: Date,
    required: [true, 'Opening date is required'],
  },
  sellingDate: {
    type: Date,
    default: null,
  },
  buyPrice: {
    type: Number,
    required: [true, 'Buy price is required'],
    min: 0,
  },
  sellPrice: {
    type: Number,
    default: 0,
    min: 0,
  },
  numberOfShares: {
    type: Number,
    required: [true, 'Number of shares is required'],
    min: 1,
  },
  investmentAmount: {
    type: Number,
    default: 0,
  },
  sellValue: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Number,
    default: 0,
  },
  halfProfit: {
    type: Number,
    default: 0,
  },
  profitPercentage: {
    type: Number,
    default: 0,
  },
  perShareProfit: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['applied', 'allotted', 'not allotted', 'sold', 'hold'],
    default: 'applied',
  },
  notes: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to calculate financial values
IPOSchema.pre('save', function(next) {
  const buy = Number(this.buyPrice) || 0;
  const sell = Number(this.sellPrice) || 0;
  const shares = Number(this.numberOfShares) || 0;
  
  // Calculate investment
  const investment = buy * shares;
  
  // Calculate sell value
  const sellValue = sell * shares;
  
  // Calculate profit
  const profit = sellValue - investment;
  
  // Calculate half profit
  const halfProfit = profit / 2;
  
  // Calculate profit percentage
  const profitPercentage = investment > 0 ? (profit / investment) * 100 : 0;
  
  // Calculate per share profit
  const perShareProfit = sell - buy;

  this.investmentAmount = investment;
  this.sellValue = sellValue;
  this.profit = profit;
  this.halfProfit = halfProfit;
  this.profitPercentage = profitPercentage;
  this.perShareProfit = perShareProfit;
  this.updatedAt = Date.now();
  
  next();
});

// Pre-update middleware for findOneAndUpdate
IPOSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  const docToUpdate = this._update;
  
  // Get values from update or existing document
  const buyPrice = update.buyPrice || docToUpdate.buyPrice;
  const sellPrice = update.sellPrice || docToUpdate.sellPrice || 0;
  const numberOfShares = update.numberOfShares || docToUpdate.numberOfShares;
  
  if (buyPrice && numberOfShares) {
    const buy = Number(buyPrice);
    const sell = Number(sellPrice);
    const shares = Number(numberOfShares);
    
    const investment = buy * shares;
    const sellValue = sell * shares;
    const profit = sellValue - investment;
    const halfProfit = profit / 2;
    const profitPercentage = investment > 0 ? (profit / investment) * 100 : 0;
    const perShareProfit = sell - buy;
    
    this.set({
      investmentAmount: investment,
      sellValue: sellValue,
      profit: profit,
      halfProfit: halfProfit,
      profitPercentage: profitPercentage,
      perShareProfit: perShareProfit,
      updatedAt: Date.now()
    });
  }
  next();
});

module.exports = mongoose.model('IPO', IPOSchema);