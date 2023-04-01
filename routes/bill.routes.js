const { Router } = require("express");
const { check } = require("express-validator");

const {
  billGet,
  billGetById,
  billGetByUserId,
  billDetailGetById
} = require("../controllers/bill.controller");

const { billExistById, billExistByUserId, userByIdExist } = require("../helpers");

const {
  validateFields,
  hasRole,
  isAdminRole,
  validateJWT,
} = require("../middleware");

const router = Router();

router.get("/", billGet);

router.get(
  "/bill-id/:id",
  [
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(billExistById),
    validateFields,
  ],
  billGetById
);

router.get(
  "/user-id/:id",
  [
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(billExistByUserId),
    validateFields,
  ],
  billGetByUserId
);

router.get(
  "/:id/:bill",
  [
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(userByIdExist),
    check("bill", "is not a mongoID").isMongoId(),
    check("bill").custom(billExistById),
    validateFields,
  ],
  billDetailGetById
);

router.post("/", [validateJWT, hasRole("USER_ROLE", "ADMIN_ROLE")]);
module.exports = router;
