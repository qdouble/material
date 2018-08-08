export const validateUserName = (username: string | undefined): boolean => {
  if (!username) return false;
  const re = /^([^<>\/\\*$;&'?!{}|=.@, :_#"~%^()+-]){3,30}$/;
  const testResult = re.test(String(username));
  return testResult;
};
