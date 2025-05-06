import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {
        success: false,
        message: "Please provide name, price, and image",
      };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to create product",
        };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };

    } catch (error) {
      console.error("❌ Error in createProduct:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
      };
    }
  },

 fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("❌ Error in fetchProducts:", error);
    }
  }, 
  
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
     if(!data.success) return {
        success: false,
        message: data.message || "Failed to delete product",
      };
      set((state) => ({
        products: state.products.filter(product => product._id !== pid) }));

      return { success: true, message: data.message || "Product deleted successfully" };
    } catch (error) {
      console.error("❌ Error in deleteProducts:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
      };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
  
      const data = await res.json();
  
      if (!data.success) {
        return {
          success: false,
          message: data.message || "Failed to update product",
        };
      }
  
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
  
      return { success: true, message: "Product updated successfully" };
  
    } catch (error) {
      console.error("❌ Error in updateProduct:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
      };
    }
  }
  
}));