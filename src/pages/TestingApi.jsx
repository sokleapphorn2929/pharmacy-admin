import React, { useEffect, useState } from "react";
import categoryApi from "../service/categoryApi";

export default function TestingApi() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if(loading){
    return <h1>Loading Data</h1>
  }
  return (
    <div>
        <ul>
            {categories.map((cate)=>(
                <li key={cate.id}>{cate.category_name}</li>
            ))}
        </ul>
    </div>);
}
