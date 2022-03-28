import React from "react";
import { Typography } from "@mui/material";
import UsersTable from "../Components/UsersTable";
import { useSelector } from "react-redux";
const UsersPage = () => {
  const storeData = useSelector((state) => state);
  return (
    <div>
      <Typography variant="h4" pb={2} color="primary.second">
        <b> Users Page</b>
      </Typography>
      <UsersTable users={storeData.db.users} />
    </div>
  );
};

export default UsersPage;
