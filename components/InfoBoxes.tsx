import Link from "next/link";
import InfoBox from "./InfoBox";
import { text } from "stream/consumers";
import type { ReactNode } from "react";

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto my-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          {/* renters */}
          <InfoBox
            heading='For Renters'
            backgroundColor='bg-gray-100'
            textColor='text-gray-800'
            buttonInfo={{
              link: "/properties",
              backgroundColor: "bg-violet-500",
              text: "Browse Properties",
            }}>
            Discover your ideal rental property, save favorites, and reach out
            to property owners effortlessly.
          </InfoBox>

          {/* owners */}
          <InfoBox
            heading='For Property Owners'
            backgroundColor='bg-gray-100'
            textColor='text-gray-800'
            buttonInfo={{
              link: "/properties/add",
              backgroundColor: "bg-violet-500",
              text: "Add Property",
            }}>
            Showcase your properties and connect with prospective tenants for
            both short and long-term rentals.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;
