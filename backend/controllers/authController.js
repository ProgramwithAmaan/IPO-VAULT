// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// // @desc    Register user
// // @route   POST /api/auth/register
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ success: false, error: 'User already exists' });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//     });

//     res.status(201).json({
//       success: true,
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       },
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     res.json({
//       success: true,
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       },
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // @desc    Get current user
// // @route   GET /api/auth/me
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };








const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    console.log('📝 Registration request received:', req.body);
    
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      console.log('❌ Missing fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide name, email and password' 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ 
        success: false, 
        error: 'User already exists with this email' 
      });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    console.log('✅ User created successfully:', user.email);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message || 'Registration failed' 
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    console.log('🔑 Login request received:', req.body.email);
    
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide email and password' 
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    console.log('✅ User found:', user.email);

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('❌ Password mismatch for:', email);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    console.log('✅ Password matched for:', user.email);

    // Generate token
    const token = generateToken(user._id);

    console.log('✅ Login successful:', user.email);

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message || 'Login failed' 
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};