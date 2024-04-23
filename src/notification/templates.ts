export const VERIFICATION_EMAIL_SUBJECT = 'Your Verification Code';

export const getVerificationEmailTemplate = (code) => {
  return `Your verification code is ${code}.`;
};
