import { Grid } from "@material-ui/core";
import DocumentItem from "app/components/Document/DocumentIem/DocumentItem";
import React from "react";

const DocumentList = () => {
  return (
    <div>
      <Grid container>
        <Grid item lg={8} md={12} xl={6} xs={12}>
          <div className="list-document">
            <DocumentItem />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DocumentList;
