const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const {
  productExistById,
  categoryExistById,
  productExistByName
} = require("../helpers");
const { validateJWT, validateFields, isAdminRole, hasRole } = require("../middleware");

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(productExistById),
    validateFields,
  ],
  getProductById
);

router.post(
  "/",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("name", "name is mandatory").not().isEmpty(),
    check("name").custom(productExistByName),
    check("category", "category is mandatory").not().isEmpty(),
    check("category", "is not a mongoID").isMongoId(),
    check("category").custom(categoryExistById),
    check("precio", "precio es obligatorio").not().isEmpty().isDecimal(),
    check("description", "descripcion es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("name", "name is mandatory").not().isEmpty(),
    check("name").custom(productExistByName),
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(productExistById),
    validateFields,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(productExistById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
