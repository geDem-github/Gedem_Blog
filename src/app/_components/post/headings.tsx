type Props = {
  headings: string[];
};

const Headings = (props: Props) => {
  return (
    <div className="border bg-slate-700 rounded-xl flex flex-col justify-center px-4 py-6">
      <div>
        <h2 className="text-3xl font-bold mb-4 md:text-2xl">もくじ</h2>
        <ul>
          {props.headings.map((text, index) => {
            return (
              <li
                key={index}
                className="py-3 text-lg ml-10 list-decimal hover:underline font-bold"
              >
                <a href={`#${text}`}>{text}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Headings;
