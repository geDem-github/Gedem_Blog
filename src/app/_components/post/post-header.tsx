import Avatar from "../avatar";
import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";

type Props = {
  title: string;
  tags: string[];
  date: string;
  coverImage: string;
};

export function PostHeader({ title, tags, date, coverImage }: Props) {
  return (
    <>
      <div className="mx-auto  mb-10">
        {/* アイキャッチ画像 */}
        <CoverImage src={coverImage} />
        {/* タグ */}
        <div className="mt-4 mb-6 px-5">
          {tags.map((tag, index) => (
            <button
              className="bg-blue-400 text-sm mr-4 p-2 rounded-lg"
              key={index}
            >
              #{tag}
            </button>
          ))}
          {/* タイトル */}
          <h1 className="my-5 text-2xl font-bold text-left md:text-3xl leading-tight leading-1">
            {title}
          </h1>
          {/* 作成日 */}
          <div className="hidden md:inline-block">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
      {/* 著者 */}
      <div className="mx-auto flex items-center justify-between px-5 md:hidden">
        <div className="block mb-6">
          <Avatar />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
