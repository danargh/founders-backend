export const randEmailVerificationCode = async (): Promise<string> => {
   const code = Math.floor(100000 + Math.random() * 900000);
   return code.toString();
};

randEmailVerificationCode().then(console.log);
