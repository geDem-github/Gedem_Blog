import { Tag } from "@/api";
import { MenuSidebar } from "./menu-sidebar";
import { PostSidebar } from "./post/post-sidebar";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  headings?: string[];
  tags?: Tag[];
};

export const GridContainer = ({ children, headings, tags }: Props) => {
  if (headings) {
    // 記事画面
    return (
      <div className="mx-auto md:flex justify-center max-w-[1700px]">
        <div className="hidden md:inline-block w-4/12 xl:w-3/12">
          <MenuSidebar />
        </div>
        <div className="w-full md:w-8/12 xl:w-6/12 md:mx-2">{children}</div>
        <div className="hidden xl:inline-block xl:w-3/12">
          <PostSidebar headings={headings} />
        </div>
      </div>
    );
  } else {
    // ホーム画面
    return (
      <div className="mx-auto md:flex justify-center max-w-7xl max-w-[1700px]">
        <div className="hidden md:inline-block w-3/12">
          <MenuSidebar />
        </div>
        <div className="w-full md:w-9/12 xl:w-7/12 md:mx-2">{children}</div>
        <div className="hidden xl:inline-block w-4/12">
          <div>
            <h3># タグ</h3>
            {tags &&
              tags.map((tag, index) => (
                <Link href={`/blog/tag/${encodeURI(tag.name)}`} key={index}>
                  <button
                    className="bg-blue-400 text-base mr-2 mb-2 py-1 px-2 rounded"
                    key={index}
                  >
                    #{tag.name}
                    &nbsp;
                    {tag.count}
                  </button>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }
};
