const backend = `http://${process.env.EXPO_PUBLIC_BACKEND_URL}`;
// const backend = `http://${process.env.EXPO_PUBLIC_BACKEND_URL}:3000`; // test purpose

// Products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${backend}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const addProduct = async (
    product_name: string,
    cost: number,
    expire: string,
    purchase_date: string,
    purchased: number,
    leftover: number,
    category_id: number,

) => {
  const body = {
    product_name: product_name,
    cost: cost,
    expire: expire,
    purchase_date: purchase_date,
    purchased: purchased,
    leftover: leftover,
    category_id: category_id
  };

  try {
    const response = await fetch(`${backend}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return data.message;
    }
  } catch (error) {
    console.error("error:", error);
  }
};



// Categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${backend}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const changeCategory = async (
    id: string,
    category_name: string,
) => {
  const body = {
    category_name: category_name,
  };

  try {
    const response = await fetch(`${backend}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
      return data.user;
    } else {
      return data.message;
    }
  } catch (error) {
    console.error("error:", error);
  }
};

export const addCategory = async (
  category_name: string,
) => {
  const body = {
    category_name: category_name,
  };

  try {
    const response = await fetch(`${backend}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await response.json();
    } catch (err) {
      return "Invalid JSON response from server.";
    }

    if (response.ok) {
      return data;
    } else {
      return data.message || `Server error: ${response.status}`;
    }
  } catch (error: any) {
    console.error("Fetch error:", error);
    return error.message || "Network error";
  }
};




// user
export const handleLogin = async (
  username: string,
  password: string

) => {
  try {
    const response = await fetch(`${backend}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      return data.user;
    } else {
      return data.message;
    }
  } catch (error) {
    console.error("error:", error);
  }
};

//signup
export const handleSignUp = async (id: string, password: string, fname: string, lname: string, role: string) => {
  const loginData = {
      id: id,
      password: password,
      first_name: fname,
      last_name: lname,
      role: role,
    };
  try {
    const response = await fetch(`${backend}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    if (response.ok) return data;
    return data.message || "Signup failed";
  } catch (error) {
    return "Network error. Please try again.";
  }
};