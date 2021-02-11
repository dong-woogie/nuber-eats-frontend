import React from "react";
import { IStatus } from "../../pages/driver/Dashboard";

interface IDriverDashboradNavProps {
  status: IStatus;
  onClick: (status: IStatus) => () => void;
}

function DriverDashboradNav({ status, onClick }: IDriverDashboradNavProps) {
  return (
    <header className="flex text-white h-16">
      <div
        onClick={onClick(IStatus.wating)}
        className={`flex-1 center h-full hover:bg-green-600 cursor-pointer ${
          status === IStatus.wating ? "bg-green-600" : "bg-green-500"
        }`}
      >
        대기중
      </div>
      <div
        onClick={onClick(IStatus.working)}
        className={`flex-1 center h-full hover:bg-green-600 cursor-pointer ${
          status === IStatus.working ? "bg-green-600" : "bg-green-500"
        }`}
      >
        진행중
      </div>
      <div
        onClick={onClick(IStatus.done)}
        className={`flex-1 center h-full hover:bg-green-600 cursor-pointer ${
          status === IStatus.done ? "bg-green-600" : "bg-green-500"
        }`}
      >
        완료
      </div>
    </header>
  );
}

export default DriverDashboradNav;
