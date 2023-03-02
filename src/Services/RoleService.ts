import api from "../config/Api";

const RoleService = {
  findAll: () => api.get("/user/roles")}
export default RoleService;
