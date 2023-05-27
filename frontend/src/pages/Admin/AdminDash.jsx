import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { useNavigate } from "react-router-dom";
import instance from "../../util/instance";
import { getTeacherRoute } from "../../API/Routes";

function AdminDash({ user }) {
  const [teachers, setTeachers] = useState(null);
  const navigate = useNavigate();
  if (user.role != "admin") {
    navigate("/");
  }
  useEffect(() => {
    instance.get(getTeacherRoute).then((res) => {
      setTeachers(res.data);
    });
  }, []);
  return (
    <Layout>
      <div className="bg-white items-center justify-center m-8 mb-0 flex rounded-lg">
        <p className="p-4 text-2xl font-semibold">
          {user?.google?.emails[0]?.value}
        </p>
      </div>
      <div className="bg-white flex-1 m-8 p-4 flex justify-start items-start overflow-hidden rounded-lg">
        <div className="bg-[#9BA4B5] min-w-min max-w-[900px] rounded-lg min-h-min max-h-[400px] overflow-hidden flex flex-col items-center justify-center p-5">
          <h1 className="text-xl p-[40px]">TEACHERS</h1>
          <div className="overflow-y-auto flex flex-col gap-5">
            {teachers?.map((teach) => (
              <div
                className="flex gap-12 items-center justify-center bg-white shadow-lg p-4"
                key={teach._id}
              >
                <p className="text-xl font-medium rounded-md"> {`${teach.fName} ${teach.lName}`}</p>
                <div className="flex gap-1">
                  {teach.class.map((cl) => (
                    <div key={cl} className="flex p-2 gap-5">
                      <div className="bg-[#212A3E] text-white p-2 px-4 rounded-lg">
                        {cl}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDash;
