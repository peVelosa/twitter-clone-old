"use client";

import Link from "next/link";

const ErrorTweetPage = () => {
  return (
    <div>
      Something went wronk{" "}
      <Link
        href={"/"}
        className="underline text-blue-300"
      >
        click here
      </Link>{" "}
      to go to main page
    </div>
  );
};

export default ErrorTweetPage;
