import { useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import { Pagination } from "../pagination/Pagination";
import { Product } from "~/models/listmodel";
import { Popup } from "../popup/Popup";


const ProductList = () => {
  const [nextUrl, setNextUrl] = useState<string | null>(
    "https://api.mocki.io/v2/k9idtwt4/list"
  );
  const [horizontalProductList, setHorizontalProductList] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * 2;
  const selectedItem = productList?.slice(startIndex, startIndex + 2);
  const [errorMessage, setErrorMessage] = useState<string>();
  const amountFormatter = (item:Product)=>{
    return item.price+"."+item.countOfPrices+" TL";
  }
  const navigateDetail = (code: number) => {
    navigate(`/details/${code}`);
  };
  const fetchProducts = async (url: string) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setErrorMessage("Service daily request count exceeded");
        }
        return response.json();
      })
      .then((data) => {
        if(data && data.horizontalProductList && data.productList)
        {
          setHorizontalProductList((prev) => [
            ...prev,
            ...data.horizontalProductList,
          ]);
          setProductList((prev) => [...prev, ...data.productList]);
          setNextUrl(data.nextUrl);
        }
        
      })
      .catch((reason) => {
        setErrorMessage(reason.message);
      });
  };

  useEffect(() => {
    if (nextUrl) {
      fetchProducts(nextUrl);
    }
  }, [nextUrl]);

  return (
    <><div className="flex flex-col">
      <div className="flex overflow-x-scroll space-x-4 w-full">
        {horizontalProductList?.map((product, index) => (
          <div className="card">
            <img
              key={index}
              src={product?.imageUrl}
              width="250"
              height="100"
              alt="HorizontalProduct"
              onClick={() => navigateDetail(product.code)} />
            <h1>{product?.name}</h1>
            <p className="price">{amountFormatter(product)}</p>
            <p>{product.dropRatio} Satıcı</p>
            <p>{product.followCount} + Takip</p>
          </div>
        ))}
      </div>

      <div className="container mx-auto p-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          {selectedItem.map((item) => (
            <div className="card">
              <img
                key={item.code}
                src={item.imageUrl}
                alt="Product"
                className="w-64 h-fit object-cover"
                onClick={() => navigateDetail(item.code)} />
              <h1>{item?.name}</h1>
              <p className="price">{amountFormatter(item)}</p>
              <p>{item.dropRatio} Satıcı</p>
              <p>{item.followCount} + Takip</p>
            </div>

          ))}
        </div>

        <Pagination
          total={productList.length}
          current={currentPage}
          onChange={(page) => setCurrentPage(page)} />
      </div>
    </div><Popup message={errorMessage}></Popup></>
  );
};



export default ProductList;
