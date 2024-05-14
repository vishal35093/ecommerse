import React, { useState, useEffect } from "react";
import axios from "axios";
import Category from "./Category";
import Spinner from './Spinner';

function App() {
  const [finalCategory, setFinalCategory] = useState([]);
  const [finalpro, setFinalPro] = useState([]);
  const [catName, setCatName] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

  });

  function tick() {
    setCurrentDate(new Date());
  }

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setFinalCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
      getProducts();
    };

    const getProducts = () => {
      setLoading(true);
      axios.get('https://dummyjson.com/products')
        .then((prores) => prores.data)
        .then((finalres) => {
          setFinalPro(finalres.products);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getCategory();
  }, []);

  useEffect(() => {
    if (catName !== "") {
      setLoading(true);
      axios.get(`https://dummyjson.com/products/category/${catName}`)
        .then((prores) => prores.data)
        .then((finalres) => {
          setFinalPro(finalres.products);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [catName]);

  let pitems = finalpro.map((product, index) => (
    <ProductsItems key={index} pdata={product} />
  ));

  return (
    <>
      
      <div className="text-center text-[40px] font-bold bg-slate-500 fixed w-full top-0"> Welcome To Miyau Shop </div><br /><br /><br />
      <div className="mx-[50px]">
        <h1>Current Date and Time</h1>
        <p>{currentDate.toLocaleString()}</p>
      </div>
      <div className="py-[40px]">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-center text-[40px] font-bold mb-[30px]">
            Our Products
          </h1>
          <div className="text-center text-[40px] gap-[20px]">
            <div className="grid grid-cols-[30%_auto] gap-[20px]">
              <div>
                <Category
                  finalCategory={finalCategory}
                  setCatName={setCatName}
                />
              </div>

              <div className="">
                <div className="grid grid-cols-3 gap-5">
                  {loading ? (
                    <Spinner />
                  ) : (
                    finalpro.length >= 1 ? (
                      pitems
                    ) : (
                      'No Products Found'
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductsItems({ pdata }) {
  return (
    <div className="shadow-lg text-center pb-4">
      <img
        src={pdata.thumbnail}
        className="w-[100%] h-[220px]"
        alt={pdata.title}
      />
      <h4>{pdata.title}</h4>
      <b>Rs {pdata.price}</b><br />
      <b className="cursor-pointer border-collapse bg-emerald-700 rounded-md mx-2 ">Add to cart</b><br />
      <b className="cursor-pointer border-collapse bg-sky-800 rounded-md mx-2 ">Buy Now</b>
    </div>
  );
}

export default App;
