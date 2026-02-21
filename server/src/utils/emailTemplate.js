const verifyEmail = (data) => {
  return `
        <h1>Hello ${data.name}</h1>
        <h2>Please verify your email</h2>
        <p>${data.token}</p>
    `;
};

module.exports = { verifyEmail };
