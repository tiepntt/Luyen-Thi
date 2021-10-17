import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, makeStyles, Paper, Theme } from "@material-ui/core";
import { DropDownInput } from "app/components/_share/Input/DropDownInput";
import { SearchFilterInput } from "app/components/_share/Input/SearchFilter";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { SearchModel } from "models/document/SearchModel";
import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import { documentTypes } from "settings/document/documentType";
import "./style.scss";
interface Props {
  onChangeCondition: (key: string, value: any) => void;
  filter?: SearchModel;
}
const DocumentSearchForm: React.FC<Props> = (props) => {
  const { onChangeCondition, filter } = props;
  const classes = useStyles();
  const { grades } = useGrades();
  const { subjects } = useSubjects();
  return (
    <div id="search-header">
      <Container className="container-header">
        <h1 className="header-search-title">
          Nền tảng trắc nghiệm số, ôn luyện tốt nhất
        </h1>
        <div className="border">
          <Row>
            <Col lg={6} xs={12}>
              <Paper className={classes.root}>
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <FontAwesomeIcon icon={faSearch} size="sm" />
                </IconButton>
                <SearchFilterInput
                  onChange={() => {}}
                  onSelect={(e: any) => {
                    onChangeCondition("key", e?.name || e);
                  }}
                  input={[]}
                  placeHolder="Từ khóa, chuyên đề hoặc thể loại"
                />
              </Paper>
            </Col>
            <Col lg={2} xs={12}>
              <DropDownInput
                input={documentTypes as any}
                value={filter?.type || 0}
                onSelect={(e) => {
                  onChangeCondition("type", e);
                }}
                label="Thể loại"
              />
            </Col>
            <Col lg={2} xs={6}>
              <DropDownInput
                input={grades as any}
                value={filter?.gradeCode || 0}
                onSelect={(e) => {
                  onChangeCondition("gradeCode", e);
                }}
                label="Lớp"
                getValue="code"
              />
            </Col>
            <Col lg={2} xs={6}>
              <DropDownInput
                input={subjects as any}
                value={filter?.subjectCode || 0}
                onSelect={(e) => {
                  onChangeCondition("subjectCode", e);
                }}
                label="Môn học"
                getValue="code"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default DocumentSearchForm;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "2px 2px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: 40,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
