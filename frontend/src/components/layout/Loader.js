import { css } from "@emotion/css";
import BeatLoader from "react-spinners/BeatLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  color: black;
`;

function App() {
  return (
    <div className="d-flex justify-self-center align-self-center">
      <BeatLoader color="#fd5c32" css={override} size={30} />
    </div>
  );
}

export default App;
