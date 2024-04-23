const mongoose = require("mongoose");
const slugify = require("slugify");

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name!!"],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration!!"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size!!"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty!!"],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price!!"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a summary!!"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image!!"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// we are adding virtual data to database
toursSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Document Middleware
toursSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// toursSchema.pre("save", function (next) {
//   console.log("Will save document..");
//   next();
// });

// toursSchema.pre("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

// Query Middleware
toursSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

toursSchema.pre(/^find/, function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  console.log(doc);
  next();
});

// Aggregation Middleware
toursSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
});

const Tour = mongoose.model("Tour", toursSchema);

module.exports = Tour;
