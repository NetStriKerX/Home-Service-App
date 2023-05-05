import { supabase } from "../utils/supabase.js";

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "Unauthorized" });
  console.log(token);
  const tok = token.split(" ")[1];
  const { error, ...rest } = await supabase.auth.getUser(tok);
  console.log(error);
  // console.log(rest);
  if (error) return res.status(401).json({ error: error.message });

  next();
};
