import { FC } from "react";
import Slide from "../Slide";

const Title: FC = (props) => {
  return (
    <Slide className="black">
      <img
        src="/images/title.png"
        style={{ maxWidth: "80%" }}
        alt="MRI画像のなりたち"
      />
      <div>放射線科 三木聡一郎</div>
    </Slide>
  );
};

export default Title;
