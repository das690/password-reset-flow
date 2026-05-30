const crypto = require('crypto');
const bcrypt = require('bcrypt'); 
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please check your email.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; 
    await user.save();

    const resetUrl = `https://password-resetflow-task.netlify.app/reset-password/${resetToken}`;
    const message = `You are receiving this email because you requested a password reset.\n\nPlease click on the following link to complete the process:\n\n${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request',
        message: message,
      });

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.log("brevo api error: ", error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    // ---> WE ADDED THIS LINE RIGHT HERE <---
    console.log("CRITICAL ERROR IN FORGOT PASSWORD:", error); 
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been successfully reset!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with that email.' });
    }

    // 2. Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create and save the new user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'Account created successfully! You can now log in.' });

  } catch (error) {
    console.log("Error in register:", error);
    res.status(500).json({ message: 'Server Error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // 2. Compare the entered password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // 3. Generate a JWT Token
    // In a real app, 'your_jwt_secret_key' should be in your .env file
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'your_temporary_jwt_secret_key', 
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      message: 'Login successful!',
      token: token 
    });

  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ message: 'Server Error during login' });
  }
};