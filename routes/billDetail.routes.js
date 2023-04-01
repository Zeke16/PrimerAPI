const { Router } = require("express");
const { check } = require("express-validator");

const {
  billDetailGet,
  billDetailPost,
  billDetailGetById,
  billDetailPut,
} = require("../controllers/billDetail.controller");
const { generateBillDetail, billDetailsExistById, productExistById } = require("../helpers");
const { validateFields, validateJWT, hasRole } = require("../middleware");

const router = Router();

router.get("/", billDetailGet);
router.get(
  "/:id",
  [
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(billDetailsExistById),
    validateFields,
  ],
  billDetailGetById
);
router.post(
  "/",
  [
    validateJWT,
    hasRole("ADMIN_ROLE", "USER_ROLE"),
    generateBillDetail,
    validateFields,
  ],
  billDetailPost
);

router.put(
  "/:id", 
  [
    validateJWT, 
    hasRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(billDetailsExistById),
    check("product", "name is mandatory").not().isEmpty(),
    check("product").custom(productExistById),
    validateFields
  ],
  billDetailPut
);
module.exports = router;
