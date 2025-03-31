// Products
export const fetchProducts = async () => {
    try {
        const response = await fetch(`http://${process.env.EXPO_PUBLIC_BACKEND_URL}:3000/products`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Categories
export const fetchCategories = async () => {
    try {
        const response = await fetch(`http://${process.env.EXPO_PUBLIC_BACKEND_URL}:3000/categories`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// user
export const handleLogin = async (id: string, password: string) => {
    const loginData = {
        id: id,
        password: password,
    };

    try {
        const response = await fetch(`http://${process.env.EXPO_PUBLIC_BACKEND_URL}:3000/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        })
        const data = await response.json();

        if (response.ok) {
            return data.user;
        } else {
            return data.message;
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};

