import { useReactiveVar } from "@apollo/client";
import React from "react";
import { IStatus, orderStatusCountVars } from "../../apollo";

interface IDashboradNavProps {
  status: IStatus;
  onClick: (status: IStatus) => () => void;
  count?: ICount;
}

interface ICount {
  wating?: number;
  working?: number;
  done?: number;
}

function DashboradNav({ status, onClick, count }: IDashboradNavProps) {
  const orderStatusCount = useReactiveVar(orderStatusCountVars);
  return (
    <header className="flex text-white h-16">
      <div
        onClick={onClick(IStatus.wating)}
        className={`flex-1 center h-full hover:bg-gray-600 cursor-pointer ${
          status === IStatus.wating ? "bg-gray-600" : "bg-gray-500"
        }`}
      >
        대기중{" "}
        <span className="ml-1 text-black text-sm font-bold w-5 h-5 center rounded-full bg-white">
          {orderStatusCount.wating}
        </span>
      </div>
      <div
        onClick={onClick(IStatus.working)}
        className={`flex-1 center h-full hover:bg-gray-600 cursor-pointer ${
          status === IStatus.working ? "bg-gray-600" : "bg-gray-500"
        }`}
      >
        진행중
        <span className="ml-1 text-black text-sm font-bold w-5 h-5 center rounded-full bg-white">
          {orderStatusCount.working}
        </span>
      </div>
      <div
        onClick={onClick(IStatus.done)}
        className={`flex-1 center h-full hover:bg-gray-600 cursor-pointer ${
          status === IStatus.done ? "bg-gray-600" : "bg-gray-500"
        }`}
      >
        완료
        <span className="ml-1 text-black text-sm font-bold w-5 h-5 center rounded-full bg-white">
          {orderStatusCount.done}
        </span>
      </div>
    </header>
  );
}

export default DashboradNav;
