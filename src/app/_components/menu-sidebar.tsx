import Link from "next/link";
import avatarImage from "../_images/author-image/geDem.png";
import wantedlyImage from "../_images/sns-images/Wantedly_Mark_Wht.png";
import githubImage from "../_images/sns-images/github-mark-white.png";
import faHouse from "../_images/fontawesome-icons/house-solid.svg";

export const MenuSidebar = () => {
  return (
    <div className="sticky top-14">
      {/* プロフィール */}
      <div className="flex flex-col items-center pt-10">
        <img
          src={avatarImage.src}
          className="w-24 h-24 rounded-full mr-4"
          alt="geDemのアバターアイコン"
        />
        <p className="text-3xl font-bold mt-2">geDem</p>
        <p className="px-5 text-sm text-gray-300 mt-2">
          文系新卒のWeb系エンジニアです。
        </p>
      </div>
      {/* SNSアイコン */}
      <div className="flex justify-center items-center mt-2">
        <a
          href="https://www.wantedly.com/id/harukikoga"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={wantedlyImage.src}
            className="w-10 h-10 rounded-full mr-4"
            alt="Wantedlyへのリンクアイコン"
          />
        </a>
        <a
          href="https://github.com/gedem-github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={githubImage.src}
            className="w-8 h-8 rounded-full mr-4"
            alt="GitHubへのリンクアイコン"
          />
        </a>
      </div>

      <hr className="w-9/12 border-gray-400 mx-auto my-7 mb-10" />

      {/* サイト内リンクメニュー */}
      <Link
        href="/"
        className="flex justify-center mr-14 a px-5 hover:text-white"
      >
        <img src={faHouse.src} className="w-7 h-7 mr-6" alt="ホーム" />
        <p className="text-base pt-1">Home</p>
      </Link>
    </div>
  );
};
