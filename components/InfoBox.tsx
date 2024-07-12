import Link from "next/link";
import type { ReactNode } from "react";

export type InfoBoxProps = {
  heading: string;
  backgroundColor: string;
  textColor: string;
  buttonInfo: {
    text: string;
    link: string;
    backgroundColor: string;
  };
  children?: ReactNode;
};

const InfoBox = ({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}: InfoBoxProps) => {
  return (
    <div
      className={`${backgroundColor} p-6 rounded-lg shadow-2xl bg-violet-50`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <Link
        href={buttonInfo.link}
        className={`inline-block bg-black ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}>
        {buttonInfo.text}
      </Link>
    </div>
  );
};
export default InfoBox;
