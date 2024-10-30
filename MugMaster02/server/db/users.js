const supabase = require("../../services/supabase");

const createUser = async (object) => {
  const { data, error } = await supabase
    .from("users")
    .insert([object])
    .select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};
// https://supabase.com/docs/reference/javascript/select
const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select();
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};

const getUserById = async (id) => {
  const { data, error } = await supabase.from("users").select().eq("id", id);
  if (error) {
    console.error(error);
    return error;
  }
  return data;
};