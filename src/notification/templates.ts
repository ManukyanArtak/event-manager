export const VERIFICATION_EMAIL_SUBJECT = 'Your Verification Code';
export const NEW_COMMENT_SUBJECT = 'New Comment';

export const getVerificationEmailTemplate = (code) => {
  return `Your verification code is ${code}.`;
};

export const getNewCommentEmailTemplate = (eventName, comment) => {
  return `<p>New comment for event -  ${eventName}.</p>  <p>Comment - ${comment}</p>.`;
};
