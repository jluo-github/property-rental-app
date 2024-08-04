import { Schema, model, models } from "mongoose";

export interface IProperty {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    owner: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },

      zip: {
        type: String,
      },
    },

    beds: {
      type: Number,
      required: true,
    },

    baths: {
      type: Number,
      required: true,
    },

    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: {
        type: Number,
      },
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },

    images: [
      {
        type: String,
      },
    ],

    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Property =
  models.Property || model<IProperty>("Property", PropertySchema);

export default Property;
