import React from "react";
import ChatIcon from "./ChatIcon";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="max-h-screen hidden lg:flex lg:flex-col items-center justify-center bg-base-200 p-12">
      <ChatIcon
        primary={"fill-primary"}
        secondary={"fill-secondary"}
        accent={"fill-accent"}
        neutral={"fill-neutral"}
      />
      <div className="max-w-md text-center">
        <div className="grid grid-cols-4 gap-8 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
