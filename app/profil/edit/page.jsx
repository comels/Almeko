import { getCurrentUser } from "@/app/actions/userActions";
import FormProfile from "@/components/FormProfile";

const EditProfile = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <FormProfile currentUser={currentUser} />
    </div>
  );
};

export default EditProfile;
