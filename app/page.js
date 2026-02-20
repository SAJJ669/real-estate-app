import Image from "next/image";
import ListingMapView from "./_components/ListingMapView";

export default function Home() {
  return (
    <>
      <div className="bg-white px-10">
        <ListingMapView type='sell' />
      </div>
    </>
  );
}
