const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole } = require("../middleware");

const {
  isAValidRole,
  emailExist,
  userByIdExist,
  roleExists,
} = require("../helpers/db-validators");

const {
  usersGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("name", "name is mandatory").not().isEmpty(),
    check("password", "password should have at least 6 charactes").isLength({
      min: 6,
    }),
    check("email", "email is not valid").isEmail(),
    check("email").custom(emailExist),
    check("role").custom(isAValidRole),
    validateFields,
  ],
  userPost
);

router.put(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "is not a valid mongo ID").isMongoId(),
    check("id").custom(userByIdExist),
    check("email").custom(emailExist),
    check("role").custom(isAValidRole),
    validateFields,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "is not a valid mongo ID").isMongoId(),
    check("id").custom(userByIdExist),
    validateFields,
  ],
  userDelete
);

module.exports = router;
