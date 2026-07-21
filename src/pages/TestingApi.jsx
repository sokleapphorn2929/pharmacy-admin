import React, { useEffect, useState } from "react";
import categoryApi from "../service/categoryApi";

export default function TestingApi() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div>
        <ul>
            {categories.map((cate)=>(
                <li key={cate.id}>{cate.category_name}</li>
            ))}
        </ul>
    </div>);
}
