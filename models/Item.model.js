import mongoose from "mongoose";



const itemSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: [true, "Owner ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["vehicles", "tools", "electronics", "sports", "furniture", "clothing", "books", "other"],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
      min: [0, "Price cannot be negative"],
    },
    pricePerWeek: {
      type: Number,
      min: [0, "Price cannot be negative"],
    },
    pricePerMonth: {
      type: Number,
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    condition: {
      type: String,
      enum: ["new", "like-new", "good", "fair", "poor"],
      default: "good",
    },
    location: {
      address: String,
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: String,
      zipCode: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    availability: {
      type: String,
      enum: ["available", "rented", "unavailable"],
      default: "available",
    },
    availableDates: [
      {
        startDate: Date,
        endDate: Date,
      },
    ],
    specifications: {
      type: Map,
      of: String,
    },
    deposit: {
      type: Number,
      default: 0,
      min: [0, "Deposit cannot be negative"],
    },
    minimumRentalPeriod: {
      value: {
        type: Number,
        default: 1,
      },
      unit: {
        type: String,
        enum: ["day", "week", "month"],
        default: "day",
      },
    },
    maximumRentalPeriod: {
      value: Number,
      unit: {
        type: String,
        enum: ["day", "week", "month"],
      },
    },
    rules: [String],
    isActive: {
      type: Boolean,
      default: false,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    approvedBy: {
      type: String,
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    rejectionReason: {
      type: String,
      trim: true,
      default: "",
      maxlength: [300, "Rejection reason cannot exceed 300 characters"],
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
)

itemSchema.methods.incrementViews = function () {
  this.views += 1
  return this.save()
}

const Item = mongoose.model("Item" , itemSchema)

export default Item