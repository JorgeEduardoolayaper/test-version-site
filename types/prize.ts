export interface Prize {
    id: number;
    category: PrizeCategory;
    product: Product;
}

export interface Product {
    id: number;
    code: string,
    pname: string,
    image: string,
    price: number,
}

export enum PrizeCategory {
    ONE = "one",
    TWO = "two",
    THREE = "three",
    FOUR = "four",
}
export interface Reward {
    id: number;
    pcode: string;
    pname: string;
    image: string;
    image_path: string;
    price: number;
    tax: number;
    insurance: number;
    delivery: number;
    commission: number;
    credits: number;
}

