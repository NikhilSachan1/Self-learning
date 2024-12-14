// Interface adjusted based on the provided schema
export interface IDirectSaleApiResponse {
    value: Value;
}

export interface Value {
    id: string;
    type: string;
    items: Item[];
    categories: CategoryElement[];
    groups: Group[];
    productAttributes: { [key: string]: ProductAttribute };
    wearers: any[];
    wearerActions: null;
    wearerRoles: any[];
    cart: Cart;
    serviceDates: ServiceDates;
    colours: Colour[];
    meta: ValueMeta;
    advertisement: null;
    address: null;
    contactDetails: ContactDetails;
}

export interface Cart {
    id: string;
    type: string;
    orderingType: string;
    product: CartProduct[];
    newWearers: any[];
    deliveryInfo: null;
    meta: CartMeta;
}

export interface CartMeta {
    orderNumber: string;
    locationDescription: string;
    orderedByName: string;
    purchaseOrder: null;
    deliveryDate: null;
    dealership: string;
    deliveryCosts: null;
    orderTotal: number;
    currency: Currency;
    note: null;
    state: string;
    orderGrossTotal: number;
    isPriceEnabled: boolean;
}

export enum Currency {
    Aud = "AUD",
}

export interface CartProduct {
    id: string;
    productCartId: string;
    type: ProductType;
    productCode: string;
    productOptionCode: string;
    code: string;
    displayName: string;
    qty: number;
    colour: string;
    size: null | string;
    unit: Unit;
    note: null;
    serviceProperties: null;
    thumbnailUrl: string;
    fullImageUrl: string;
    wearer: null;
    price: number;
    currency: Currency;
    priceTotal: number;
    productAttributes: any[];
    meta: ProductMeta;
}

export interface ProductMeta {
    status: null;
    minQuantity: number;
    maxQuantity: number;
    areBarcodesEnabled: boolean;
    isPriceEnabled: boolean;
    isStatusAsQty: boolean;
    isPricePerApplication: boolean;
    isNoteRequired: boolean;
    isDisabled: boolean;
    isQtyDisabled: boolean;
    isFrequentProduct: boolean;
}

export enum ProductType {
    Product = "product",
    Inventory = "inventory",
}

export enum Unit {
    Each = "Each",
    Roll = "Roll",
    Box = "Box",
    Pack = "Pack",
    Carton = "Carton",
}

export interface CategoryElement {
    displayName: string;
    imageWhiteUrl: null;
    imageCode: null;
    id: string;
}

export interface Colour {
    code: string;
    displayName: string;
    hexCode: string;
    hexCode2: null | string;
    hexCode3: null;
    url: null;
}

export interface ContactDetails {
    fullname: string;
    phoneNumber: null;
    email: string;
}

export interface Group {
    displayName: string;
    id: string;
}

export interface Item {
    type: ItemType;
    code: string;
    iconUrl: null;
    productType: ProductTypeEnum;
    prices: Price[];
    category: GroupClass;
    group: GroupClass;
    wearer: null;
    productAttributes: string[];
    meta: ProductMeta;
    product: ItemProduct[];
}

export interface GroupClass {
    id: string;
}

export interface Price {
    productId: string;
    price: number;
    currency: Currency;
    unit: Unit;
}

export enum ProductTypeEnum {
    Inventory = "INVENTORY",
}

export interface ItemProduct {
    id: string;
    itemCode: string;
    type: ProductType;
    lineNumber: null;
    code: string;
    displayName: string;
    qty: number;
    colour: string | null;
    size: string | null;
    unit: Unit;
    thumbnailUrl: string;
    fullImageUrl: string;
    additionalImagesUrls: unknown[];
    meta: ProductMeta;
}

export enum ItemType {
    ProductGroups = "product-groups",
}

export interface ValueMeta {
    catalogueDisplayName: string;
    isApprovalsAvailable: boolean;
    isHistoryAvailable: boolean;
    isAddWearerEnabled: boolean;
    isWearerRoleMode: boolean;
    isAdvertisementAvailable: boolean;
    newWearersCategory: null;
    orderLimit: number;
    orderCharge: number;
    catalogueDisplayNote: null;
    cartDisplayNote: null;
}

export interface ProductAttribute {
    code: string;
    displayName: string;
    fullDescription: null | string;
    bkgColour: string;
    fullImageUrl: string;
    iconUrl: string;
}

export interface ServiceDates {
    id: number;
    type: string;
    nextDateDisplayName: string;
    nextDate: Date;
    frequencies: Frequency[];
}

export interface Frequency {
    frequency: string;
    date: Date;
}

export interface IDirectSaleTransformedData {
    [categoryId: string]: {
        [groupId: string]: {
            [code: string]: {
                [itemCode: string]: {
                    [color: string]: {
                        [size: string]: ItemProduct[]
                    }
                };
            };
        };
    };
}