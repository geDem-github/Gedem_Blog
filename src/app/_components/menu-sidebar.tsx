import avatarImage from "../_images/author-image/geDem.png";
import wantedlyImage from "../_images/sns-images/Wantedly_Mark_Wht.png";
import githubImage from "../_images/sns-images/github-mark-white.png";
import faHouse from "../_images/fontawesome-icons/house-solid.svg";
import { MenuItem } from "./menu-item";

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
        <p className="w-10/12 text-sm text-gray-300 mt-2">
          文系新卒のモバイルエンジニアです。ウェブも好きです。
        </p>
      </div>

      <hr className="w-9/12 border-gray-400 mx-auto my-7 mb-10" />

      {/* サイト内リンクメニュー */}
      <div className="w-10/12 mx-auto">
        <MenuItem
          destination={"/"}
          imgSrc={faHouse.src}
          title={"ホーム"}
          isExternal={false}
        />
        <MenuItem
          destination={"https://github.com/gedem-github"}
          imgSrc={githubImage.src}
          title={"GitHub"}
          isExternal={true}
        />
        <MenuItem
          destination={"https://www.wantedly.com/id/harukikoga"}
          imgSrc={wantedlyImage.src}
          title={"Wantedly"}
          isExternal={true}
        />
      </div>
    </div>
  );
};
