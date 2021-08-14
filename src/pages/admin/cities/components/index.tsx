import React from "react";
import { deleteRegion, listCities, deleteCity } from "../services";
import TableComponent from "../../../../components/Table";
import { Button, TableCell, TableRow } from "@material-ui/core";
import { For } from "../../../../components/For";
import { If } from "../../../../components/If";
import Chip from "@material-ui/core/Chip";
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

export default function Cities() {
  const [loading, setLoading] = React.useState(true);
  const [records, setRecords] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await listCities();
    setRecords(data.records);
    setLoading(false);
  }

  async function handleDelete(cityId: string, regionId: string) {
    await deleteRegion(regionId);
    setNotify({ open: true, message: "region has been deleted" });
    let clone = [...records];
    let target = clone.find((city) => city._id === cityId);
    target.regions = target.regions.filter(
      (region: any) => region._id !== regionId
    );
    setRecords(clone);
  }

  async function handleDeleteCity(cityId: string) {
    await deleteCity(cityId);
    setNotify({ open: true, message: "city has been deleted" });
    setRecords(records.filter((city) => city._id !== cityId));
  }

  return (
    <PageLayout>
      <PageHeader title="Cities">
        <Link className="transparent-link d-flex" to="/admin/cities/new">
          <ControlPointOutlined className="icon-link" />
          New City
        </Link>
      </PageHeader>

      <If condition={loading}>
        <Spinner />
      </If>
      <If condition={!loading}>
        <TableComponent
          className="card-wrapper"
          titles={["code", "Name", "regions", "actions"]}
        >
          <For
            data={records}
            render={(row: any) => (
              <TableRow>
                <TableCell align="left">{row.code}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <If condition={row.regions}>
                    <For
                      data={row.regions}
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
                    module="Cities"
                    handleDelete={handleDeleteCity}
                    url={`/admin/cities/${row._id}/update`}
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
