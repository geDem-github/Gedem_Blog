import avatarImage from "../images/author-image/geDem.png";

export const Avatar = () => {
  return (
    <div className="flex items-center md:hidden">
      <img
        src={avatarImage.src}
        className="w-12 h-12 rounded-full mr-4"
        alt="geDemのアバターアイコン"
      />
      <div className="text-2xl font-bold">geDem</div>
    </div>
  );
};

export default Avatar;
