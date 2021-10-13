import { Grid } from "@material-ui/core";
import DocumentLabel from "app/components/Document/DocumentLabel";
import { DocumentSearchSidebar } from "app/components/SideBar/DocumentSearchSidebar/DocumentSearchSidebar";
import DocumentBreadcumbs from "app/components/_share/Breadcrumbs/DocumentBreadcumbs";
import DocumentSearchForm from "app/components/_share/Form/DocumentSearchForm/DocumentSearchForm";
import { AppPagination } from "app/components/_share/Pagination/Pagination";
import { SearchModel } from "models/document/SearchModel";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./style.scss";
const DocumentSearch: React.FC = () => {
  const [count] = React.useState(10);
  const [filter, setFilter] = useState<SearchModel>({
    take: 5,
    skip: 0,
    key: "",
    page: 1,
  });
  const onChangeCondition = (key: string, value: any) => {
    setFilter({
      ...filter,
      [key]: value,
      page: 1,
      skip: 0,
    });
  };
  const onChangeState = (e: any) => {
    setFilter(e);
  };
  const params = [
    {
      title: "Đề thi",
      href: "/exam",
    },
    {
      title: "Thi THPT Quốc gia",
      href: "/exam/thptqg",
    },
    {
      title: "Toán học",
      href: "/exam/thptqg/toan-hoc",
    },
  ];
  return (
    <div className="document-search-page">
      <DocumentSearchForm
        filter={filter}
        onChangeCondition={onChangeCondition}
        onChangeFilter={onChangeState}
      />
      <Container className="content">
        <Grid container spacing={3}>
          <Grid item lg={8} xl={8} xs={12} md={12}>
            {/* list document */}

            <div className="list-document-side-bar">
              <DocumentBreadcumbs rootPath={"/document"} params={params} />
              <div className="header-title">
                Đề thi thử THPT Quốc gia chọn lọc, miễn phí
              </div>
              <div id="hint-result">
                <b>1 - 10</b> trong <b>300</b> kết quả cho "
                <span id="key-word">Từ khóa tìm kiếm</span>"
              </div>
              <div className="list-document">
                <DocumentLabel />
                <DocumentLabel />
                <DocumentLabel />
                <DocumentLabel />
                <DocumentLabel />
              </div>
              <hr />
              <div className="pagination-tag">
                <AppPagination
                  pageActive={filter.page}
                  lastPage={Math.ceil(count / filter.take)}
                  onPageChange={(page) => {}}
                />
              </div>
            </div>
          </Grid>
          <Grid item lg={4} xl={4} xs={12} md={12}>
            <div className="document-side-bar">
              <DocumentSearchSidebar />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DocumentSearch;
