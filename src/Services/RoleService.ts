import api from "../config/Api";

const roleSet = new Set();

const RoleService = {
  findAll: () => api.get("/user/roles")}
export default RoleService;
