"use client"
import React, { useEffect, useState } from 'react'
import ListingMapView from "../../_components/ListingMapView";
import { supabase } from '../../../utils/supabase/client';

function ForRent() {
  const [hasRentals, setHasRentals] = useState(false);

  useEffect(() => {
    checkRentalAvailability();
  }, []);

  const checkRentalAvailability = async () => {
    const { count, error } = await supabase
      .from('listing')
      .select('*', { count: 'exact', head: true }) // head: true returns only count, not data (faster)
      .eq('active', true)
      .eq('type', 'Rent');

    if (count > 0) setHasRentals(true);
  };

  return (
    <div>
      <div className="p-10">
        {hasRentals ? (
          <ListingMapView type='Rent' />
        ) : (
          <div className="p-10 text-center text-gray-500 italic">
            Currently, there are no listings available for rent.
          </div>
        )}
      </div>
    </div>
  )
}

export default ForRent