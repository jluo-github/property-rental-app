import type { IProperty } from "@/models/Property";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";

const PropertyDetails = ({ property }: { property: IProperty }) => {
  return (
    <main>
      <div className='bg-violet-50  p-6 rounded-lg shadow-2xl text-center md:text-left'>
        <div className='text-gray-500 mb-4'>{property.type}</div>
        <h1 className='text-3xl font-bold mb-4'>{property.name}</h1>
        <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
          {/* address */}
          <FaMapMarker className=' text-lg text-fuchsia-500 mr-2'></FaMapMarker>
          <p className='text-fuchsia-500'>
            {property.location.street}, {property.location.city},{" "}
            {property.location.state}, {property.location.zip}
          </p>
        </div>

        <h3 className='text-lg font-bold my-6 bg-violet-500 text-white p-2'>
          Rates & Options
        </h3>
        <div className='flex flex-col md:flex-row justify-around'>
          {/* nightly */}
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Nightly</div>
            <div className='text-2xl font-bold'>
              {/* time icon */}
              {property.rates.nightly ? (
                ` $${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className=' text-red-700'></FaTimes>
              )}
            </div>
          </div>
          {/* weekly */}
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
            <div className='text-2xl font-bold  text-violet-500'>
              {property.rates.weekly ? (
                `$${property.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className=' text-red-700'></FaTimes>
              )}
            </div>
          </div>
          {/* monthly */}
          <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Monthly</div>
            <div className='text-2xl font-bold  text-violet-500'>
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className=' text-red-700'></FaTimes>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* description: */}
      <div className='bg-violet-50 p-6 rounded-lg shadow-2xl mt-6'>
        <h3 className='text-lg font-bold mb-6'>Description & Details</h3>
        <div className='flex justify-center gap-4 text-violet-500 mb-4 text-xl space-x-9'>
          <p>
            <FaBed className='inline-block mr-1'></FaBed> {property.beds}
            <span className='hidden sm:inline'> Beds</span>
          </p>
          <p>
            <FaBath className='inline-block mr-1'></FaBath> {property.baths}
            <span className='hidden sm:inline'> Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline-block mr-1'></FaRulerCombined>
            {property.square_feet}{" "}
            <span className='hidden sm:inline'> sqft</span>
          </p>
        </div>
        <p className='text-gray-500 mb-4 text-center'>{property.description}</p>
      </div>

      {/* amenities: */}
      <div className='bg-violet-50  p-6 rounded-lg shadow-2xl mt-6'>
        <h3 className='text-lg font-bold mb-6'>Amenities</h3>

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-1'>
          {property.amenities.map((amenity, item) => (
            <li key={item}>
              <FaCheck className='text-green-600 mr-1 inline-block' /> {amenity}
            </li>
          ))}
        </ul>
      </div>

      {/* todo */}
      {/* map: */}
      <div className='bg-violet-50  p-6 rounded-lg shadow-2xl mt-6'>
        <div id='map'></div>
      </div>
    </main>
  );
};
export default PropertyDetails;
