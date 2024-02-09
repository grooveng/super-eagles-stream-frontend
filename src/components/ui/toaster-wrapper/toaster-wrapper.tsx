import React, { ReactNode, createContext, useContext } from "react";
import { AiFillInfoCircle, AiFillWarning } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { SprayMoneyIcon } from "../spray-money-icon";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import {
  ToastContainer,
  toast,
  ToastOptions,
  TypeOptions,
} from "react-toastify";

interface ToastContextType {
  showToast: (message?: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export interface ToastContainerWrapperProps {
  children?: ReactNode;
}

export const ToastContainerWrapper: React.FC<ToastContainerWrapperProps> = ({
  children,
}) => {
  const defaultOptions: ToastOptions = {
    autoClose: 3000,
    closeButton: false,
    hideProgressBar: false,
  };

  const showToast = (message?: string, options: ToastOptions = {}) => {
    toast(message, {
      ...defaultOptions,
      ...options,
      icon: getIcon(options.type),
      className: getClassName(options.type),
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastContainerWrapper");
  }

  return context;
};

function getClassName(type?: TypeOptions) {
  if (type === "error") return "error-toast";
  if (type === "success") return "success-toast";
  if (type === "info") return "info-toast";
  if (type === "warning") return "warning-toast";
  return "custom-toast";
}

function getIcon(type?: TypeOptions) {
  if (type === "error") return <AiFillWarning />;
  if (type === "success") return <BsCheck2Circle />;
  // if (type === "info") return <SprayMoneyIcon/>;
  if (type === "warning") return <PiWarningOctagonDuotone />;
  return "";
}
