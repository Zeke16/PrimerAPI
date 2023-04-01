const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { categoryExistById, categoryExistByName } = require("../helpers/db-validators");
const { validateJWT, validateFields, isAdminRole, hasRole } = require("../middleware");

const router = Router();

router.get("/", getCategories);

router.get(
  "/:id",
  [
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  getCategoryById
);

router.post(
  "/",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("name", "name is mandatory").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("name", "name is mandatory").not().isEmpty(),
    check("name").custom(categoryExistByName),
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  updateCategory
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "is not a mongoID").isMongoId(),
    check("id").custom(categoryExistById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
