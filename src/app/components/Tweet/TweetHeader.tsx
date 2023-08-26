import Link from "next/link";
import ImageWithFallback from "../ImageWithFallback";

type TweetHeaderProps = { image: string; userName: string; name: string };

const TweetHeader = ({ image, userName, name }: TweetHeaderProps) => {
  const href = `/profile/${userName}`;

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
    </>
  );
};

export default TweetHeader;
