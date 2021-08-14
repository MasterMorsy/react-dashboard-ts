import React from "react";
import { Grid } from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";
import endPoint from "../../../services";
import { For } from "../../../components/For";

export default function Statistics() {
  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await endPoint.get("/admins/statistics");
    setState(data.statistics);
  }

  return (
    <>
      <div className="statistics mt-8">
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Grid container spacing={3}>
              <For
                data={state}
                render={(item: any) => (
                  <Grid item md={3}>
                    <div className="shadow-lg mb-4 rounded-2xl p-4 bg-white dark:bg-gray-800">
                      <div className="flex items-center">
                        <span className="bg-green-500 p-2 h-10 w-10 rounded-full relative">
                          <PermIdentity style={{ color: "#fff" }} />
                        </span>
                        <p className="text-md py-4 text-gray-700 dark:text-gray-50 ml-2">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex flex-col justify-start">
                        <p className="text-center text-gray-800 text-4xl  text-left dark:text-white font-bold my-4">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </Grid>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
