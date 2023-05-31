import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useData = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemObjects, setItemObjects] = useState({});

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://home-service-app-czih.vercel.app/data/categories"
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategory = async (param) => {
    try {
      const response = await axios.get(
        "https://home-service-app-czih.vercel.app/data/categories/" + param
      );
      setItemObjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCategory = async (data) => {
    try {
      const response = await axios.post(
        "https://home-service-app-czih.vercel.app/data/categories",
        data
      );
      navigate("/categories");
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const editCategory = async (param, data) => {
    try {
      const response = await axios.put(
        "https://home-service-app-czih.vercel.app/data/categories/" + param,
        data
      );
      navigate("/categories");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (param) => {
    try {
      const response = await axios.delete(
        "https://home-service-app-czih.vercel.app/data/categories/" + param
      );
      navigate("/categories");
    } catch (error) {
      console.error(error);
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get(
        "https://home-service-app-czih.vercel.app/data/services"
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addService = async (formData) => {
    try {
      const response = await axios.post(
        "https://home-service-app-czih.vercel.app/data/services",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/services");
    } catch (error) {
      console.error(error);
      return error.response.data.error;
      return error.response.data.error;
    }
  };

  const getService = async (param) => {
    try {
      const response = await axios.get(
        "https://home-service-app-czih.vercel.app/data/services/" + param
      );
      const { services } = response.data[0];
      const result = response.data.map((item) => {
        delete item.services;
        return item;
      });
      services.subServiceList = result;
      setItemObjects(services);
    } catch (error) {
      console.error(error);
    }
  };

  const editService = async (param, formData) => {
    try {
      const response = await axios.put(
        "https://home-service-app-czih.vercel.app/data/services/" + param,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/services");
    } catch (error) {
      console.error(error);
      return error.response.data.error;
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await axios.delete(
        `https://home-service-app-czih.vercel.app/data/services/${id}`
      );
      navigate("/services");
    } catch (error) {
      console.error(error);
    }
  };

  const addPayment = async (formData) => {
    try {
      const response = await axios.post(
        "https://home-service-app-czih.vercel.app/data/services",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/services");
    } catch (error) {
      console.error(error);
      return error.response.data.error;
    }
  };

  const getPromotions = async () => {
    try {
      const response = await axios.get(
        "https://home-service-app-czih.vercel.app/data/promotions"
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPromotion = async (promotionData) => {
    try {
      const response = await axios.post(
        "https://home-service-app-czih.vercel.app/data/promotions",
        promotionData
      );
      if (response?.data?.message === "Promotion code already exists.") {
        return response.data.message;
      }
      navigate("/promotions");
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to add the promotion. Please try again.",
      };
    }
  };

  const getPromotion = async (param) => {
    try {
      const response = await axios.get(
        "https://home-service-app-czih.vercel.app/data/promotions/" + param
      );
      setItemObjects(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updatePromotion = async (promotionId, promotionData) => {
    try {
      const response = await axios.put(
        `https://home-service-app-czih.vercel.app/data/promotions/${promotionId}`,
        promotionData
      );
      navigate("/promotions");
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to update the promotion. Please try again.",
      };
    }
  };

  const deletePromotion = async (id) => {
    try {
      const response = await axios.delete(
        `https://home-service-app-czih.vercel.app/data/promotions/${id}`
      );
      navigate("/promotions");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    items,
    getCategories,
    addCategory,
    getServices,
    addService,
    getCategory,
    itemObjects,
    editCategory,
    deleteCategory,
    getService,
    editService,
    deleteService,
    addPayment,
    addPromotion,
    getPromotion,
    updatePromotion,
    getPromotions,
    deletePromotion,
  };
};

export default useData;
