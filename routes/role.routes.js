const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole } = require("../middleware");
const {
  roleGet,
  rolePost,
  rolePut,
  roleDelete,
} = require("../controllers/role.controller");
const { roleExists } = require("../helpers");

const router = Router();

router.get("/", roleGet);

router.post(
  "/",
  [
    validateJWT,
    check("role", "role es obligatorio!").not().isEmpty(),
    check("role").custom(roleExists),
    validateFields,
  ],

  rolePost
);

router.put(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "is not a valid mongo ID").isMongoId(),
    check("role", "role es obligatorio!").not().isEmpty(),
    validateFields,
  ],
  rolePut
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "is not a valid mongo ID").isMongoId(),
    check("role", "role es obligatorio!").not().isEmpty(),
    validateFields,
  ],
  roleDelete
);
module.exports = router;
