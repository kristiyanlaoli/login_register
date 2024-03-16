import prisma from "../utils/prisma.js";
const validateRegister = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = {};
  // Validate name
  if (name.length < 1) {
    errors.name = "Name is required";
  }
  // check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    errors.email = "Email already in use";
  }
  // Validate valid email
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.email = "Must be a valid email";
  }
  // Validate email
  if (!email) {
    errors.email = "Email is required";
  }
  // validate minimum password
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  // Validate password
  if (!password) {
    errors.password = "Password is required";
  }

  // Validate confirmPassword
  if (confirmPassword !== password) {
    errors.confirmPassword = "Password does not match";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ errors });
  }
  next();
};

export default validateRegister;
