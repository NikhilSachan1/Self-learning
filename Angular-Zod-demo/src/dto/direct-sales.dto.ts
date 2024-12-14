import { z } from 'zod';

const currencyEnum = z.enum(["AUD"]);

const unitEnum = z.enum(["Each", "Roll", "Box", "Pack", "Carton"]);

const productTypeEnum = z.enum(["products", "inventory"]);

const itemTypeEnum = z.enum(["product-groups"]);

const productTypeEnumInventory = z.enum(["INVENTORY"]);

const productMetaSchema = z.object({
  status: z.null(),
  minQuantity: z.number(),
  maxQuantity: z.number(),
  areBarcodesEnabled: z.boolean(),
  isPriceEnabled: z.boolean(),
  isStatusAsQty: z.boolean(),
  isPricePerApplication: z.boolean(),
  isNoteRequired: z.boolean(),
  isDisabled: z.boolean(),
  isQtyDisabled: z.boolean(),
  isFrequentProduct: z.boolean(),
});

const categoryElementSchema = z.object({
  displayName: z.string(),
  imageWhiteUrl: z.null(),
  imageCode: z.null(),
  id: z.string(),
});

const colourSchema = z.object({
  code: z.string(),
  displayName: z.string(),
  hexCode: z.string(),
  hexCode2: z.union([z.null(), z.string()]),
  hexCode3: z.union([z.null(), z.string()]),
  url: z.null(),
});

const contactDetailsSchema = z.object({
  fullname: z.string(),
  phoneNumber: z.null(),
  email: z.string(),
});

const groupClassSchema = z.object({
  id: z.string(),
});

const priceSchema = z.object({
  productId: z.string(),
  price: z.number(),
  currency: currencyEnum,
  unit: unitEnum,
});

const itemProductSchema = z.object({
  id: z.string(),
  itemCode: z.string(),
  type: productTypeEnum,
  lineNumber: z.null(),
  code: z.string(),
  displayName: z.string(),
  qty: z.number(),
  colour: z.union([z.null(), z.string()]),
  size: z.union([z.null(), z.string()]),
  unit: unitEnum,
  thumbnailUrl: z.string(),
  fullImageUrl: z.string(),
  additionalImagesUrls: z.array(z.unknown()),
  meta: productMetaSchema,
});

const itemSchema = z.object({
  type: itemTypeEnum,
  code: z.string(),
  iconUrl: z.null(),
  productType: productTypeEnumInventory,
  prices: z.array(priceSchema),
  category: groupClassSchema,
  group: groupClassSchema,
  wearer: z.null(),
  productAttributes: z.array(z.string()),
  meta: productMetaSchema,
  products: z.array(itemProductSchema),
});

const groupSchema = z.object({
  displayName: z.string(),
  id: z.string(),
});

const cartProductSchema = z.object({
  id: z.string(),
  productCartId: z.string(),
  type: productTypeEnum,
  productCode: z.string(),
  productOptionCode: z.string(),
  code: z.string(),
  displayName: z.string(),
  qty: z.number(),
  colour: z.string(),
  size: z.union([z.null(), z.string()]),
  unit: unitEnum,
  note: z.null(),
  serviceProperties: z.null(),
  thumbnailUrl: z.string(),
  fullImageUrl: z.string(),
  wearer: z.null(),
  price: z.number(),
  currency: currencyEnum,
  priceTotal: z.number(),
  productAttributes: z.array(z.unknown()),
  meta: productMetaSchema,
});

const cartMetaSchema = z.object({
  orderNumber: z.string(),
  locationDescription: z.string(),
  orderedByName: z.string(),
  purchaseOrder: z.null(),
  deliveryDate: z.null(),
  dealership: z.string(),
  deliveryCosts: z.null(),
  orderTotal: z.number(),
  currency: currencyEnum,
  note: z.null(),
  state: z.string(),
  orderGrossTotal: z.number(),
  isPriceEnabled: z.boolean(),
});

const cartSchema = z.object({
  id: z.string(),
  type: z.string(),
  orderingType: z.string(),
  products: z.array(cartProductSchema),
  newWearers: z.array(z.unknown()),
  deliveryInfo: z.null(),
  meta: cartMetaSchema,
});

const valueMetaSchema = z.object({
  catalogueDisplayName: z.string(),
  isApprovalsAvailable: z.boolean(),
  isHistoryAvailable: z.boolean(),
  isAddWearerEnabled: z.boolean(),
  isWearerRoleMode: z.boolean(),
  isAdvertisementAvailable: z.boolean(),
  newWearersCategory: z.null(),
  orderLimit: z.number(),
  orderCharge: z.number(),
  catalogueDisplayNote: z.null(),
  cartDisplayNote: z.null(),
});

const serviceDatesSchema = z.object({
  id: z.number(),
  type: z.string(),
  nextDateDisplayName: z.string(),
  nextDate: z.string(),
  frequencies: z.array(z.object({
    frequency: z.string(),
    date: z.string(),
  })),
});

const directSaleApiResponseSchema = z.object({
  value: z.object({
    id: z.string(),
    type: z.string(),
    items: z.array(itemSchema),
    categories: z.array(categoryElementSchema),
    groups: z.array(groupSchema),
    productAttributes: z.record(z.string(), z.object({
      code: z.string(),
      displayName: z.string(),
      fullDescription: z.union([z.null(), z.string()]),
      bkgColour: z.string(),
      fullImageUrl: z.string(),
      iconUrl: z.string(),
    })),
    wearers: z.array(z.unknown()),
    wearerActions: z.null(),
    wearerRoles: z.array(z.unknown()),
    cart: cartSchema,
    serviceDates: serviceDatesSchema,
    colours: z.array(colourSchema),
    meta: valueMetaSchema,
    advertisement: z.null(),
    address: z.null(),
    contactDetails: contactDetailsSchema,
  }),
});

export type DirectSaleApiResponseDto = z.infer<typeof directSaleApiResponseSchema>;

export function parseDirectSaleApiResponseDTO(source: unknown) {
  return directSaleApiResponseSchema.safeParse(source);
}