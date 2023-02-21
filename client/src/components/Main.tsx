import { MainProps } from "types";

const Main = ({ title, subtitle }: MainProps) => {
  return (
    <section className="flex min-h-fit bg-primaryZinc pb-32">
      <div className="flex flex-col justify-center m-6 items-end pl-4">
        <h1 className="pt-2 pl-4 pb-6 text-7xl font-extrabold tracking-wider text-primaryBlue">
          {title}
        </h1>
        <h2 className="pt-2 pl-4 pb-6 text-4xl font-bold text-primaryBlue">
          {subtitle}
          <span className="text-primaryOrange">.</span>
        </h2>
      </div>
    </section>
  );
};

export default Main;
