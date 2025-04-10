const backend = `http://${process.env.EXPO_PUBLIC_BACKEND_URL}`

// Products
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${backend}/products`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Categories
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${backend}/categories`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// user
export const handleLogin = async (id: string, passwords: string, fname: string, lname: string, role: string) => {
    const loginData = {
        id: id,
        password: passwords,
        first_name: fname,
        last_name: lname,
        role: role
    };

    try {
        const response = await fetch(`${backend}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        })
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            return data.user;
        } else {
            return data.message;
        }
    } catch (error) {
        console.error('error:', error);
    }
};


//signup
export const handleSignUp = async (username: string, password: string) => {
  try {
    const response = await fetch(`${backend}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) return data;
    return data.message || "Signup failed";
  } catch (error) {
    return "Network error. Please try again.";
  }
};

