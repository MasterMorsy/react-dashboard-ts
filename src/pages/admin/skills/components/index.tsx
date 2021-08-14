import React from "react";
import { listSkills, deleteSkill } from "../services";
import TableComponent from "../../../../components/Table";
import { Button, Chip, TableCell, TableRow } from "@material-ui/core";
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
import TableActions from "../../../../components/TableActions";

export default function Skills() {
  const [loading, setLoading] = React.useState(true);
  const [records, setRecords] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await listSkills();
    setRecords(data.records);
    setLoading(false);
  }

  async function handleDelete(parentId: string, targetId: string) {
    await deleteSkill(targetId);
    setNotify({ open: true, message: "Skill has been deleted" });
    if (parentId) {
      let clone = [...records];

      clone.find((item: any) => item._id === parentId).children = clone
        .find((item: any) => item._id === parentId)
        .children.filter((child: any) => child._id !== targetId);
      setRecords(clone);
    } else setRecords(records.filter((record) => record._id !== targetId));
  }

  return (
    <PageLayout>
      <PageHeader title="Category">
        <Link className="transparent-link d-flex" to="/admin/skills/new">
          <ControlPointOutlined className="icon-link" />
          New Category
        </Link>
      </PageHeader>

      <If condition={loading}>
        <Spinner />
      </If>
      <If condition={!loading}>
        <TableComponent
          className="card-wrapper"
          titles={["code", "Name", "actions"]}
        >
          <For
            data={records}
            render={(row: any, index: number) => (
              <TableRow>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">
                  <p>{row.name}</p>
                  <If condition={row.children}>
                    <For
                      data={row.children}
                      render={(item: any) => (
                        <Chip
                          key={item._id}
                          label={item.name}
                          onDelete={() => handleDelete(row._id, item._id)}
                        />
                      )}
                    />
                  </If>
                </TableCell>

                <TableCell align="left">
                  <TableActions
                    options={["update", "delete"]}
                    id={row._id}
                    module="Skills"
                    handleDelete={(id: string) => handleDelete("", id)}
                    url={`/admin/skills/${row._id}/update`}
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
