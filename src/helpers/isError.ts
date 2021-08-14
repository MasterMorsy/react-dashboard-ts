interface ErrorProps {
  key: string;
  value: string;
  status: boolean;
}

export function isError(errors: Array<ErrorProps>, key: string) {
  const falsy = {
    status: false,
    value: "",
  };
  let target = errors.find((error) => error.key === key);
  return target
    ? {
        status: true,
        value: target.value,
      }
    : falsy;
}

export function isGlobalError(errors: Array<ErrorProps>) {
  return errors.length === 1 && errors[0].key === "error"
    ? errors[0].value
    : "";
}
