import Header from "@/components/shared/header";
import Transformationform from "@/components/shared/transformationform";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async (props:SearchParamProps) => {
  const params = await props.params;

  const {
    type
  } = params;

  const { userId } = await auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);

  return <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <Transformationform
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
};

export default AddTransformationTypePage;
