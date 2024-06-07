import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";

import Layout from "~/components/layout";
import { Popup } from "~/components/popup/Popup";
import * as detailmodel from "~/models/detailmodel";

export default function Detail() {
  let { id } = useParams();
  const [data, setProductDetailData] = useState<detailmodel.Detail | null | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const priceFormat = data?.price+"."+data?.countOfPrices+" TL";
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  useEffect(() => {
    fetch(`https://api.mocki.io/v2/k9idtwt4/detail/${id}`)
      .then((response) => {
        if (!response.ok) {
          setErrorMessage("Service daily request count exceeded");
        }
        return response.json();
      })
      .then((response) => {
        setProductDetailData(response)
      }).catch((reason) => {
        setErrorMessage(reason.message);
      });
  }, [data]);

  return (
    <><Layout>
      <div className="flex flex-row justify-between p-8 space-x-8 bg-white rounded-lg">
        <div className="flex-none w-2/5 p-12 ">
          <img
            src={data?.imageUrl}
            alt={data?.badge}
            className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold  text-Blue">
            {data?.productName}
          </h1>
          <h1 className="badge-special">
            {data?.badge}
          </h1>
          <div>
            <p className="text-xs mt-3">Kapasite Seçenekleri</p>
            <div className="space-y-2 space-x-4">
              {data?.storageOptions.map((option: any) => (
                <button
                  key={option}
                  className={`px-4 py-2 border ${selectedOption === option
                      ? "border-gray-500"
                      : "border-gray-200"}`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-0.5 bg-gray-200 mt-6 mb-6"></div>
          <div className="flex justify-between items-center w-3/5 mt-6">
            <div className="space-x-2 flex items-center">
              <span className="font-bold text-xl">{priceFormat}</span>
              <span>TL</span>
              <div className="text-Green">
                <span className="text-Green">{data?.freeShipping ? 'Ücretsiz Kargo' : ''}</span>
              </div>
            </div>
          </div>
          <h1 className="text-gray-400 text-sm mt-4">
            Son güncelleme: {data?.lastUpdate}
          </h1>
        </div>
      </div>
    </Layout><Popup message={errorMessage}></Popup></>
  );
}
