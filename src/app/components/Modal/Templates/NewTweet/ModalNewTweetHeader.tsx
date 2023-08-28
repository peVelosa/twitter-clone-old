import type { FC } from "react";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";
import { FaTimes } from "react-icons/fa";

type ModalNewTweetHeaderProps = {
  image: string;
  userName: string;
  name: string;
  closeModal: () => void;
};

const ModalNewTweetHeader: FC<ModalNewTweetHeaderProps> = ({
  image,
  userName,
  name,
  closeModal,
}) => {
  const href = `/${userName}`;

  return (
    <>
      <div className="flex gap-4 items-start">
        <Link
          href={href}
          className="w-fit block"
        >
          <ImageWithFallback
            src={image}
            alt="profile image"
            width={42}
            height={42}
            className="rounded-full hover:scale-110 cursor-pointer w-fit"
          />
        </Link>
        <Link href={href}>
          <p className="text-white font-bold hover:underline">{name}</p>
        </Link>
        <Link href={href}>
          <p className="text-white-600">@{userName}</p>
        </Link>
      </div>
      <button
        className="p-2 hover:bg-red-400 rounded-full -mt-2"
        onClick={closeModal}
      >
        <FaTimes
          className="fill-red-700"
          size={20}
        />
      </button>
    </>
  );
};

export default ModalNewTweetHeader;
