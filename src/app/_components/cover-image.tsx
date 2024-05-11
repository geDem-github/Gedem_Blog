type Props = {
  src: string;
  slug?: string;
};

const CoverImage = ({ src, slug }: Props) => {
  return (
    <div>
      <img
        src={src}
        alt="記事のカバー写真"
        className={
          slug ? "rounded object-cover" : "w-full rounded-t-xl object-cover"
        }
      />
    </div>
  );
};

export default CoverImage;
