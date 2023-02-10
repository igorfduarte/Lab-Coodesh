const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
  code: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["published", "draft", "trash"],
    required:true,
  },
  imported_t: {
    type: Date,
    default: Date.now,
    required:true
  },
  url: {
    type: String,
    default: "",
  },
  creator: {
    type: String,
    default: "",
  },
  created_t: {
    type: Number,
    default: 0,
  },
  last_modified: {
    type: Number,
    default: 0,
  },
  product_name: {
    type: String,
    default: "",
  },
  quantity: {
    type: String,
    default: "",
  },
  brands: {
    type: String,
    default: "",
  },
  categories: {
    type: String,
    default: "",
  },
  labels: {
    type: String,
    default: "",
  },
  cities: {
    type: String,
    default: "",
  },
  purchase_places: {
    type: String,
    default: "",
  },
  stores: {
    type: String,
    default: "",
  },
  ingredients_text: {
    type: String,
    default: "",
  },
  traces: {
    type: String,
    default: "",
  },
  serving_size: {
    type: String,
    default: "",
  },
  serving_quantity: {
    type: Number,
    default: 0,
  },
  nutriscore_score: {
    type: Number,
    default: 0,
  },
  nutriscore_grade: {
    type: String,
    default: "",
  },
  main_category: {
    type: String,
    default: "",
  },
  image_url: {
    type: String,
    default: "",
  },
});

ProductSchema.pre('insertMany',function(next,docs){
  try {
    docs.map((doc)=>{
      doc.status = "published"
    })
  } catch (error) {
    console.log(error)
  }
  next()
})
ProductSchema.pre('findOneAndUpdate',function(next){
  this.status = "published"
  next()
})

module.exports = mongoose.model("Product", ProductSchema);
