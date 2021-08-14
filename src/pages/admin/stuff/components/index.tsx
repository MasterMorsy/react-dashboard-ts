import React from "react";
import { listUsers, deleteUser } from "../services";
import TableComponent from "../../../../components/Table";
import { Button, TableCell, TableRow } from "@material-ui/core";
import { For } from "../../../../components/For";
import { If } from "../../../../components/If";
import {
  DeleteOutline,
  BorderColor,
  ControlPointOutlined,
} from "@material-ui/icons";
import BusinessStore from "../../../../context/context";
import { Link } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";
import PageLayout from "../../../../components/PageLayout";
import Spinner from "../../../../components/Spinner";

export default function Stuff() {
  const [loading, setLoading] = React.useState(true);
  const [records, setRecords] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await listUsers("?type=stuff");
    setRecords(data.records);
    setLoading(false);
  }

  async function handleDelete(stuffId: string) {
    await deleteUser(stuffId);
    setNotify({ open: true, message: "stuff has been deleted" });
    setRecords(records.filter((stuff) => stuff._id !== stuffId));
  }

  return (
    <PageLayout>
      <PageHeader title="Stuff">
        <Link className="transparent-link d-flex" to="/admin/stuff/new">
          <ControlPointOutlined className="icon-link" />
          New Stuff
        </Link>
      </PageHeader>

      <If condition={loading}>
        <Spinner />
      </If>
      <If condition={!loading}>
        <TableComponent
          className="card-wrapper"
          titles={["N", "Name", "Role", "actions"]}
        >
          <For
            data={records}
            render={(row: any, index: number) => (
              <TableRow>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.role?.name}</TableCell>

                <TableCell align="left">
                  <Link
                    className="mr-10 MuiButtonBase-root MuiButton-root MuiButton-contained sm-btn MuiButton-containedSizeSmall MuiButton-sizeSmall"
                    to={`/admin/stuff/${row._id}/update`}
                  >
                    <BorderColor fontSize="small" />
                  </Link>
                  <Button
                    className="sm-btn"
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteOutline fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          />
        </TableComponent>
      </If>
    </PageLayout>
  );
}
