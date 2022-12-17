import renderer from "react-test-renderer";
import NotFound from "../NotFound";
import { Route } from "react-router-dom";
import { withRoute } from "../../tests/utils";

describe("not found page", () => {
  it("정확하게 페이지가 랜더링 되야 한다", () => {
    const tree = renderer
      .create(withRoute(<Route path='/' element={<NotFound />} />))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
