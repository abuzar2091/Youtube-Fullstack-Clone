import React from "react";
import UserChannel from "./UserChannel.jsx";
import { Outlet} from "react-router-dom";

function ChannelLayout() {
  return (
    <div className="">
      <UserChannel/>
      <section className=" h-full">
        <Outlet />
      </section>
    </div>
  );
}
export default ChannelLayout;