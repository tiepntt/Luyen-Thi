import { Grid } from "@material-ui/core";
import DocumentItem from "app/components/documents/DocumentIem/DocumentItem";
import _ from "lodash";
import { DocumentTitle } from "models/document/DocumentTitle";
import React from "react";
import { Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import "./style.scss";

interface Props {
  documents: DocumentTitle[];
}
const DocumentList = (props: Props) => {
  const { documents } = props;
  const history = useHistory();
  const location = useLocation();
  return (
    <div>
      <Grid container>
        <Grid item lg={10} md={12} xl={9} xs={12}>
          <div className="list-document">
            {_.chunk(documents, 2).map((datas, i) => {
              return (
                <Row key={i}>
                  {datas.map((data, key) => (
                    <div className="col-lg-6 col-12 item-document" key={key}>
                      <DocumentItem
                        document={data}
                        onClick={() =>
                          history.push(`${location.pathname}/${data.id}`)
                        }
                      />
                    </div>
                  ))}
                </Row>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DocumentList;
