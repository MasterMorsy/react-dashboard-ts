import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DeleteOutline, BorderColor, Visibility } from "@material-ui/icons";
import { If } from "../If";
import { isCan } from "../../middlewares/isCan";
import { admin } from "../../helpers/users";

type Props = {
  options?: Array<string>;
  id: string;
  url: string;
  module: string;
  showUrl?: string;
  handleDelete?: Function;
};

export default function TableActions({
  options,
  id,
  url,
  showUrl,
  handleDelete,
  module,
}: Props) {
  return (
    <>
      <If
        condition={
          options.includes("update") &&
          isCan(admin.get("role"), module, "update")
        }
      >
        <Link
          className="mr-10 MuiButtonBase-root MuiButton-root MuiButton-contained sm-btn MuiButton-containedSizeSmall MuiButton-sizeSmall"
          to={url}
        >
          <BorderColor fontSize="small" />
        </Link>
      </If>
      <If
        condition={
          options.includes("show") && isCan(admin.get("role"), module, "show")
        }
      >
        <a
          target="_blank"
          className="mr-10 MuiButtonBase-root MuiButton-root MuiButton-contained sm-btn MuiButton-containedSizeSmall MuiButton-sizeSmall"
          href={showUrl}
        >
          <Visibility fontSize="small" />
        </a>
      </If>
      <If
        condition={
          options.includes("delete") &&
          isCan(admin.get("role"), module, "delete")
        }
      >
        <Button
          className="sm-btn"
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(id)}
        >
          <DeleteOutline fontSize="small" />
        </Button>
      </If>
    </>
  );
}

TableActions.defaultProps = {
  options: ["show", "update", "delete"],
};
