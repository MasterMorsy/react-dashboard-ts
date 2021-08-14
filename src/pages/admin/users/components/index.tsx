import React from "react";
import { listUsers, deleteUser } from "../services";
import TableComponent from "../../../../components/Table";
import { TableCell, TableRow } from "@material-ui/core";
import { For } from "../../../../components/For";
import { If } from "../../../../components/If";
import { ControlPointOutlined } from "@material-ui/icons";
import BusinessStore from "../../../../context/context";
import { Link } from "react-router-dom";
import PageHeader from "../../../../components/PageHeader";
import PageLayout from "../../../../components/PageLayout";
import Spinner from "../../../../components/Spinner";
import SwitchComponent from "../../../../components/SwitchComponent";
import { updateUser } from "../../stuff/services";
import { urls } from "../../../../helpers/urls";
import TableActions from "../../../../components/TableActions";
import { isCan } from "../../../../middlewares/isCan";
import { admin } from "../../../../helpers/users";
import BooleanComponent from "../../../../components/BooleanComponent";

export default function Patients() {
  const [loading, setLoading] = React.useState(true);
  const [records, setRecords] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await listUsers("?type=patient");
    setRecords(data.records);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await deleteUser(id);
    setNotify({ open: true, message: "user has been deleted" });
    setRecords(records.filter((user) => user._id !== id));
  }

  async function handleActiveStatus(type: string, row: any) {
    await updateUser(row._id, { [type]: !row[type] });
    let clone = [...records];
    clone.find((user) => user._id === row._id)[type] = !row[type];
    setRecords(clone);
    setNotify({
      open: true,
      message: `${row.name} state ${type} be ${row[type]}`,
    });
  }

  return (
    <PageLayout>
      <PageHeader title="Patients">
        <Link className="transparent-link d-flex" to="/admin/patients/new">
          <ControlPointOutlined className="icon-link" />
          New Patient
        </Link>
      </PageHeader>

      <If condition={loading}>
        <Spinner />
      </If>
      <If condition={!loading}>
        <TableComponent
          className="card-wrapper"
          titles={[
            "Name",
            "Code",
            "Phone",
            "Email",
            "IsActive",
            "Website",
            "actions",
          ]}
        >
          <For
            data={records}
            render={(row: any) => (
              <TableRow>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.code}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">
                  <If
                    condition={isCan(admin.get("role"), "Patients", "update")}
                    elseIf={() => <BooleanComponent value={row.isActive} />}
                  >
                    <SwitchComponent
                      checked={row.isActive}
                      label={false}
                      handleChange={() => handleActiveStatus("isActive", row)}
                    />
                  </If>
                </TableCell>
                <TableCell align="left">
                  <If
                    condition={isCan(admin.get("role"), "Patients", "update")}
                    elseIf={() => <BooleanComponent value={row.isSpecial} />}
                  >
                    <SwitchComponent
                      checked={row.isSpecial}
                      label={false}
                      handleChange={() => handleActiveStatus("isSpecial", row)}
                    />
                  </If>
                </TableCell>

                <TableCell align="left">
                  <TableActions
                    id={row._id}
                    module="Patients"
                    handleDelete={handleDelete}
                    url={`/admin/patients/${row._id}/update`}
                    showUrl={urls.user(row)}
                  />
                </TableCell>
              </TableRow>
            )}
          />
        </TableComponent>
      </If>
    </PageLayout>
  );
}
