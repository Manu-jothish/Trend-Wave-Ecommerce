import Products from "../models/ProductModel.js";
import asyncHadler from "../middleware/asyncHandler.js";

const addProduct = asyncHadler(async (req, res) => {
  const { name, brand, category, description, price, countInStock } = req.body;

  const image = req.body ? req.file.path : null;

  const product = await Products.create({
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    image,
  });

  if (product) {
    res.status(201).json(product);
  }
});

const getProduct = asyncHadler(async (req, res) => {
  const pagesize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const keyWordCondition = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Products.countDocuments({ ...keyWordCondition });
  const products = await Products.find({ ...keyWordCondition })
    .limit(pagesize)
    .skip(pagesize * (page - 1));
  res.json({
    products,
    page,
    pages: Math.ceil(count / pagesize),
  });
});

const getProductById = asyncHadler(async (req, res) => {
  let product = await Products.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("product Not Found");
  }
});

const deleteProduct = asyncHadler(async (req, res) => {
  let product = await Products.findById(req.params.id);
  if (product) {
    await Products.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("product Not Found");
  }
});

const createReview = asyncHadler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (item) => item.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      name: req.user.name,
      rating,
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    const updateProduct = await product.save();

    res.status(201).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const   editProduct = asyncHadler(async (req, res) => {
  let { name, category, price, brand, countInStock, description } = req.body;
  let product = await Products.findOne({ _id: req.params.id });
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.countInStock = countInStock || product.countInStock;
    product.description = description || product.description;
    product.image = req.file ? req.file.path : product.image;

    const editProduct = await product.save();

    res.json(editProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const getAllProducts = asyncHadler(async (req, res) => {
  const products = await Products.find();
  res.json(products);
});
export {
  addProduct,
  getProduct,
  getProductById,
  deleteProduct,
  createReview,
  editProduct,
  getAllProducts,
};
