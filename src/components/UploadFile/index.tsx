import React from "react";
import { Button, makeStyles } from "@material-ui/core";

interface UploadFileProps {
  children: React.ReactNode;
  handleFile: Function;
  extenstions?: string;
  multiple?: boolean;
}

const useStyle = makeStyles({
  uploadBtn: {
    background: "transparent",
    width: "100%",
    boxShadow: "none",
    padding: 0,
    margin: 0,

    "&:hover": {
      boxShadow: "none",
    },
  },
  input: {
    height: 0,
  },
});

export default function UploadFile({
  children,
  handleFile,
  extenstions,
  multiple = false,
}: UploadFileProps) {
  const inputUpload = React.useRef();
  const classes = useStyle();

  function handleChages(event: any) {
    let result: Array<object> = [];
    let single: object = {
      url: "",
      file: {},
    };

    if (multiple) {
      Object.keys(event.target.files).map((key: any) => {
        result.push({
          preview: URL.createObjectURL(event.target.files[key]),
          file: event.target.files[key],
        });
      });
      handleFile(result);
    } else {
      single = {
        preview: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      };
      handleFile(single);
    }
  }

  return (
    <div className="upload-file-component">
      <Button
        variant="contained"
        onClick={() => inputUpload.current.click()}
        className={classes.uploadBtn}
      >
        {children}
      </Button>

      <input
        type="file"
        multiple={multiple}
        accept={extenstions}
        ref={inputUpload}
        onChange={handleChages}
        className={classes.input}
      />
    </div>
  );
}
