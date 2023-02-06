import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

interface Props {
    res: any;
    reqType: string;
  id: string;
  onSideBarChange: (id : string) => void;
  selectedId: string | undefined;
  }

const SideBarItems = ({ res, reqType, id, selectedId, onSideBarChange }: Props) => {

  const sty = {
    selectedList: {
      backgroundColor : id === selectedId ? "red" : null
    }
  }
  return (
    res[reqType].operationId && (
      <ListItem onClick={() => onSideBarChange(id)} selected = {id === selectedId} sx={{ padding: "0","&:hover" : {backgroundColor:"#181818"} }} key={id} component="a" href={`#${id}`}>
        <ListItemButton sx = {sty.selectedList}>
          <ListItemText sx = {{color : 'white'}}>{res[reqType].operationId}</ListItemText>
        </ListItemButton>
      </ListItem>
    )
  );
};

export default SideBarItems;
