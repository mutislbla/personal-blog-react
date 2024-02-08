import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    if (!response.data.token) {
      throw new Error("Login failed");
    }
    const token = response.data.token;
    Cookies.set("token", token);
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Login Successfully!",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error login: ${error}`,
    });
  }
};

export const register = async (full_name, username, email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/register", {
      full_name,
      username,
      email,
      password,
    });
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Register Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error register: ${error}`,
    });
  }
};

export const getUser = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get("http://localhost:3000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching user: ${error}`,
    });
  }
};

export const getPostByUser = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(`http://localhost:3000/post/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post by token: ${error}`,
    });
  }
};

export const addPost = async (formData) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post("http://localhost:3000/post", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Add post Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error add post: ${error}`,
    });
  }
};

export const editPost = async (id, title, content, category) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.put(
      `http://localhost:3000/post/${id}`,
      { title, content, category },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Edit Post Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error edit post: ${error}`,
    });
  }
};

export const deletePost = async (id) => {
  const token = Cookies.get("token");
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`http://localhost:3000/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Delete Post Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error delete post: ${error}`,
    });
  }
};

export const getPost = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get("http://localhost:3000/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post: ${error}`,
    });
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/post/${id}`);
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post by id: ${error}`,
    });
  }
};

export const getRecentPost = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get("http://localhost:3000/post/recent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching recent post: ${error}`,
    });
  }
};

export const getPostByCategory = async (category) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(
      `http://localhost:3000/post/category/${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post by category: ${error}`,
    });
  }
};

export const searchByWord = async (word) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/post/search/${word}`
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post by category: ${error}`,
    });
  }
};
