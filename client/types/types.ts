export type Product = {
    id: number;
    product_name: string;
    leftover: number;
    expire: string;
    category_id: number;
};

export type Category = {
    id: number;
    category_name: string;
}