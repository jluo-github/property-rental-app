import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <Gallery>
      <section className='bg-violet-100 p-4'>
        <div className='container mx-auto'>
          {/* one image */}
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width='1024'
              height='1024'>
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt='image'
                  className='object-cover h-[400px] mx-auto rounded-xl'
                  width={0}
                  height={0}
                  sizes='100vw'
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-col-2 gap-4'>
              {/* more images */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`
                  ${
                    images.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }
                `}>
                  <Item
                    original={image}
                    thumbnail={image}
                    width='1024'
                    height='1024'>
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt='image'
                        className='object-cover h-[400px] w-full rounded-xl'
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};
export default PropertyImages;
