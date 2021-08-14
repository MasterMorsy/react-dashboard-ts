import React from "react";
import { isObject } from "../../utilities/isObj";

/**
 * For component for interation on array or object
 * if array return single value
 * if object return key and value
 */

interface ForProps {
  data: Array<any> | any;
  render: Function;
}

function handleData(data: ForProps["data"]) {
  if (Array.isArray(data)) return data;
  else if (isObject(data)) return Object.keys(data);
}

function returnType(data: ForProps["data"]) {
  if (Array.isArray(data)) return "array";
  else if (isObject(data)) return "object";
}

export function For({ data, render }: ForProps) {
  if (!Array.isArray(data) && !isObject(data)) {
    throw new Error("data must be array or object");
  }

  return (
    <>
      {returnType(data) === "object" ? (
        <>
          {handleData(data)?.map((key: string) => (
            <React.Fragment key={key}>{render(key, data[key])}</React.Fragment>
          ))}
        </>
      ) : (
        <>
          {handleData(data)?.map((item: any, i) => (
            <React.Fragment key={i}>{render(item, i)}</React.Fragment>
          ))}
        </>
      )}
    </>
  );
}
