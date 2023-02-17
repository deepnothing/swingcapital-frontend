import React, { useEffect,useState } from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import LoadingScreen from "../screens/Loading";

export default function RootNavigation() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);


  if (user === null) {
    return <LoadingScreen />;
  }

  return user ? <UserStack /> : <AuthStack />;
}