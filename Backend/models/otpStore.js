// utils/otpStore.js
const otpStore = new Map(); // { email: { otp, data, expiresAt } }

export const saveOtp = (email, otp, data) => {
  otpStore.set(email, {
    otp,
    data,
    expiresAt: Date.now() + 5 * 60 * 1000 // valid for 5 min
  });
};

export const verifyOtp = (email, otp) => {
  const record = otpStore.get(email);
  if (!record) return false;
  if (record.otp !== otp || Date.now() > record.expiresAt) return false;
  return record.data;
};

export const clearOtp = (email) => {
  otpStore.delete(email);
};
