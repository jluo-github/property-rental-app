"use client";

import type { IProperty } from "@/models/Property";
import {
  LinkedinShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinIcon,
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = ({ property }: { property: IProperty }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share This Property:
      </h3>
      <div className='flex gap-3 justify-center pb-5'>
        <LinkedinShareButton url={shareUrl} title={property.name}>
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>

        <FacebookShareButton url={shareUrl} title={property.name}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <RedditShareButton url={shareUrl} title={property.name}>
          <RedditIcon size={40} round={true} />
        </RedditShareButton>

        <TwitterShareButton url={shareUrl} title={property.name}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <EmailShareButton url={shareUrl} subject={property.name}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
export default ShareButtons;

{
  /* // <button className='bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'> */
}
{
  /* //   <TwitterIcon size={32} round={true} />
      <FaShare className=' mr-2'></FaShare> Share
    </button> */
}
