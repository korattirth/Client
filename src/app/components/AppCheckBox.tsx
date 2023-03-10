import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  disabled : boolean;
}

const AppCheckBox = (props: Props) => {
  const { field } = useController({ ...props, defaultValue: false });
  return (
    <FormControlLabel
          control={<Checkbox {...field} checked={field.value} disabled = {props.disabled} color="secondary" />} label={props.label}    />
  );
};

export default AppCheckBox;
