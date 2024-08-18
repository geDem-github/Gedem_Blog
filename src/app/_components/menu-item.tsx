import Link from "next/link";

type Props = {
  destination: string;
  imgSrc: string;
  title: string;
  isExternal: boolean;
};

export const MenuItem = ({ destination, imgSrc, title, isExternal }: Props) => {
  const linkStyle =
    "flex items-center my-1 py-3 px-2 bg-neutral-700 rounded-md";
  const imgStyle = "w-7 h-7 mr-6";
  const titleStyle = "text-lg text-left";

  if (isExternal) {
    return (
      <a
        href={destination}
        target="_blank"
        rel="noopener noreferrer"
        className={linkStyle}
      >
        <img src={imgSrc} className={imgStyle} alt={title} />
        <p className={titleStyle}>{title}</p>
      </a>
    );
  } else {
    return (
      <Link href={destination} className={linkStyle}>
        <img src={imgSrc} className={imgStyle} alt={title} />
        <p className={titleStyle}>{title}</p>
      </Link>
    );
  }
};
