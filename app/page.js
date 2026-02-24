"use client"
import Image from "next/image";
import ListingMapView from "./_components/ListingMapView";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";
import Loading from "./(routes)/add-new-listing/loading";

export default function Home() {
  const [hasSale, setHasSale] = useState(false);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    checkSellAvailability();
  }, []);

  const checkSellAvailability = async () => {
    const { count, error } = await supabase
      .from('listing')
      .select('*', { count: 'exact', head: true }) // head: true returns only count, not data (faster)
      .eq('active', true)
      .eq('type', 'Sell');

    if (count > 0) setHasSale(true);
    setHasSale(true)
    setLoader(false)
  };

  return (
    <>
      {loader ? <div className="h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loading className="h-10 w-10 animate-spin text-brand-purple" />
        <p className="text-gray-500 animate-pulse">
          Fetching latest listings...
        </p>
      </div> :
        <div className="bg-white px-10">
          {hasSale ? <ListingMapView type='sell' /> :
            <div className="p-10 text-center text-gray-500 italic">
              Currently, there are no listings available for sale.
            </div>}
        </div>}
    </>
  );
}
