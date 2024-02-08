import Divider from "./divider";
import CategoryButton from "./categoryButton";
export default function Category() {
  return (
    <>
      {/* <Divider name="Category" /> */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8 m-24 flex items-center">
        <div>
          <CategoryButton name="Lifestyle" />
        </div>
        <div>
          <CategoryButton name="Ecomonics" />
        </div>
        <div>
          <CategoryButton name="Politics" />
        </div>
        <div>
          <CategoryButton name="Finance" />
        </div>
        <div>
          <CategoryButton name="Health" />
        </div>
        <div>
          <CategoryButton name="Technology" />
        </div>
      </div>
    </>
  );
}
