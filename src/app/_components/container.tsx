import { MenuSidebar } from "./menu-sidebar";
import { PostSidebar } from "./post/post-sidebar";

type Props = {
  children: React.ReactNode;
  headings?: string[];
  tags?: string[];
};

export const Container = ({ children, headings, tags }: Props) => {
  if (headings) {
    // 記事画面
    return (
      <div className="mx-auto md:flex justify-center max-w-7xl">
        <div className="hidden md:inline-block w-3/12">
          <MenuSidebar />
        </div>
        <div className="w-full md:w-9/12 lg:w-7/12 bg-neutral-700 rounded-xl md:mx-2">
          {children}
        </div>
        <div className="hidden lg:inline-block w-4/12">
          <PostSidebar headings={headings} />
        </div>
      </div>
    );
  } else {
    // ホーム画面
    return (
      <div className="mx-auto md:flex justify-center max-w-7xl">
        <div className="hidden md:inline-block w-3/12">
          <MenuSidebar />
        </div>
        <div className="w-full md:w-9/12 lg:w-7/12 rounded-xl md:mx-2">
          {children}
        </div>
        <div className="hidden lg:inline-block w-4/12">
          <div>
            <h3># タグ</h3>
            {tags &&
              tags.map((tag, index) => (
                <button
                  className="bg-blue-400 text-xs mr-1 mb-1 py-1 px-2 rounded"
                  key={index}
                >
                  #{tag}
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }
};
