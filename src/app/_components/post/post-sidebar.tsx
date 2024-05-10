type Props = {
  headings: string[];
};

export function PostSidebar(props: Props) {
  return (
    <div className="sticky top-24 pt-10">
      <h2 className="text-2xl font-bold mb-2">もくじ</h2>
      <div className="bg-neutral-700 rounded-xl pt-2 pb-5 px-5 border rounded-xl">
        <ul className="text-sm pl-5 py-5">
          {props.headings.map((text, index) => {
            return (
              <li
                key={index}
                className="list-decimal py-2 underline hover:font-bold duration-200"
              >
                <a href={`#${text}`}>{text}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
