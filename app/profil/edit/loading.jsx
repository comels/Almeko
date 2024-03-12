import { Loader } from "@/components/ui/loader";

const Loading = () => {
  return (
    <div className="mt-40 flex items-center justify-center gap-2">
      <Loader className="text-myblue" size={40} />
      <h1 className=" text-3xl font-bold tracking-tighter">
        Merci de patienter...
      </h1>
    </div>
  );
};

export default Loading;
