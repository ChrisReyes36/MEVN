export const register = async (req, res) => {
  const { email, password, repassword } = req.body;
  res.status(201).json({ email, password, repassword });
};

export const login = async (req, res) => {
  res.status(200).json({ msg: "Login" });
};
